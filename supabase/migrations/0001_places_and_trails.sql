-- Table Tales: public, read-only content (places, story sections, sources, trails).
--
-- SECURITY MODEL
--   * Row Level Security (RLS) is ON for every table.
--   * The browser (roles `anon` / `authenticated`) may only SELECT. There are no
--     insert/update/delete policies, and write privileges are revoked as a second layer.
--   * Content is changed only by admins: via migrations, the Supabase dashboard,
--     or the service-role key on a trusted server. Never put that key in the front end.
--   * Validation lives here (enums, CHECK constraints, foreign keys), not just in the UI.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
create type public.story_tag as enum (
  'family-owned',
  'immigrant-cuisine',
  'historic-building',
  'generations-old',
  'neighborhood-institution',
  'community-hub'
);
create type public.source_label as enum ('owner', 'researched', 'both');
create type public.section_kind as enum ('family', 'food', 'building', 'neighborhood');
create type public.source_kind as enum ('owner-interview', 'oral-history', 'archive', 'book', 'article');
create type public.trail_kind as enum ('neighborhood', 'theme');

-- ---------------------------------------------------------------------------
-- places
-- ---------------------------------------------------------------------------
create table public.places (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(btrim(name)) > 0),
  neighborhood text not null check (length(btrim(neighborhood)) > 0),
  cuisine text not null check (length(btrim(cuisine)) > 0),
  price_tier smallint not null check (price_tier between 1 and 4),
  tags public.story_tag[] not null default '{}',
  summary text not null check (length(btrim(summary)) > 0),
  source_label public.source_label not null,
  order_dish text not null check (length(btrim(order_dish)) > 0),
  order_why text not null check (length(btrim(order_why)) > 0),
  ask_them text[] not null check (cardinality(ask_them) between 3 and 4),
  mock_distance_miles numeric(4, 1) not null check (mock_distance_miles >= 0),
  is_placeholder boolean not null default true,
  -- Lower-cased text the search box matches against. Maintained by a trigger.
  search_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.place_sections (
  place_id text not null references public.places (id) on update cascade on delete cascade,
  kind public.section_kind not null,
  title text not null check (length(btrim(title)) > 0),
  body text[] not null check (cardinality(body) >= 1),
  sort_order smallint not null,
  primary key (place_id, kind)
);

create table public.place_sources (
  id bigint generated always as identity primary key,
  place_id text not null references public.places (id) on update cascade on delete cascade,
  label text not null check (length(btrim(label)) > 0),
  kind public.source_kind not null,
  note text,
  sort_order smallint not null
);
create index place_sources_place_id_idx on public.place_sources (place_id);

-- ---------------------------------------------------------------------------
-- trails
-- ---------------------------------------------------------------------------
create table public.trails (
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(btrim(title)) > 0),
  kind public.trail_kind not null,
  area text not null check (length(btrim(area)) > 0),
  description text not null check (length(btrim(description)) > 0),
  estimated_minutes integer not null check (estimated_minutes > 0),
  is_placeholder boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.trail_stops (
  trail_id text not null references public.trails (id) on update cascade on delete cascade,
  stop_order smallint not null check (stop_order >= 1),
  place_id text not null references public.places (id) on update cascade on delete restrict,
  blurb text not null check (length(btrim(blurb)) > 0),
  from_previous text,
  primary key (trail_id, stop_order),
  unique (trail_id, place_id)
);
create index trail_stops_place_id_idx on public.trail_stops (place_id);

-- ---------------------------------------------------------------------------
-- Derived data
-- ---------------------------------------------------------------------------
create function public.places_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.search_text := lower(concat_ws(
    ' ',
    new.name,
    new.neighborhood,
    new.cuisine,
    new.summary,
    replace(array_to_string(new.tags, ' '), '-', ' ')
  ));
  new.updated_at := now();
  return new;
end;
$$;
revoke execute on function public.places_before_write() from public, anon, authenticated;

create trigger places_before_write
  before insert or update on public.places
  for each row execute function public.places_before_write();

-- Neighborhood chips: name + number of places. security_invoker makes RLS apply to the caller.
create view public.neighborhoods
with (security_invoker = true) as
  select neighborhood as name, count(*)::int as place_count
  from public.places
  group by neighborhood;

-- ---------------------------------------------------------------------------
-- Row Level Security: public read-only
-- ---------------------------------------------------------------------------
alter table public.places enable row level security;
alter table public.place_sections enable row level security;
alter table public.place_sources enable row level security;
alter table public.trails enable row level security;
alter table public.trail_stops enable row level security;

create policy "Public can read places" on public.places
  for select to anon, authenticated using (true);
create policy "Public can read place sections" on public.place_sections
  for select to anon, authenticated using (true);
create policy "Public can read place sources" on public.place_sources
  for select to anon, authenticated using (true);
create policy "Public can read trails" on public.trails
  for select to anon, authenticated using (true);
create policy "Public can read trail stops" on public.trail_stops
  for select to anon, authenticated using (true);

-- Second layer: even if a write policy were added by mistake, the privilege is gone.
revoke all on public.places, public.place_sections, public.place_sources,
  public.trails, public.trail_stops, public.neighborhoods from anon, authenticated;
grant select on public.places, public.place_sections, public.place_sources,
  public.trails, public.trail_stops, public.neighborhoods to anon, authenticated;
