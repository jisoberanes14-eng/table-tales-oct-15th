-- Story details are for signed-in users only. Cards stay public.
--
--   PUBLIC (anon + signed in):  places (card fields), trails (card fields), neighborhoods
--   SIGNED-IN ONLY:             place_sections, place_sources, place_details, trail_stops
--
-- This is enforced here by Row Level Security and privileges, so it holds even if someone
-- skips the app's screens and calls the database API directly.

-- 1. Move the "at the table" fields out of the public places table. ----------------------
create table public.place_details (
  place_id text primary key references public.places (id) on update cascade on delete cascade,
  order_dish text not null check (length(btrim(order_dish)) > 0),
  order_why text not null check (length(btrim(order_why)) > 0),
  ask_them text[] not null check (cardinality(ask_them) between 3 and 4)
);

insert into public.place_details (place_id, order_dish, order_why, ask_them)
  select id, order_dish, order_why, ask_them from public.places;

alter table public.places
  drop column order_dish,
  drop column order_why,
  drop column ask_them;

-- 2. Signed-in only for every table that holds story content. -----------------------------
alter table public.place_details enable row level security;

drop policy "Public can read place sections" on public.place_sections;
drop policy "Public can read place sources" on public.place_sources;
drop policy "Public can read trail stops" on public.trail_stops;

create policy "Signed-in users can read place sections" on public.place_sections
  for select to authenticated using (true);
create policy "Signed-in users can read place sources" on public.place_sources
  for select to authenticated using (true);
create policy "Signed-in users can read place details" on public.place_details
  for select to authenticated using (true);
create policy "Signed-in users can read trail stops" on public.trail_stops
  for select to authenticated using (true);

-- Second layer: anon has no privilege on these tables at all.
revoke all on public.place_details from anon, authenticated;
revoke select on public.place_sections, public.place_sources, public.trail_stops from anon;
grant select on public.place_details to authenticated;

-- 3. Trail cards show "N stops" without exposing the stops. -------------------------------
alter table public.trails add column stop_count smallint not null default 0;

update public.trails t
  set stop_count = (select count(*) from public.trail_stops s where s.trail_id = t.id);

create function public.trail_stops_sync_count()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op in ('INSERT', 'UPDATE') then
    update public.trails
      set stop_count = (select count(*) from public.trail_stops where trail_id = new.trail_id)
      where id = new.trail_id;
  end if;
  if tg_op in ('DELETE', 'UPDATE') then
    update public.trails
      set stop_count = (select count(*) from public.trail_stops where trail_id = old.trail_id)
      where id = old.trail_id;
  end if;
  return null;
end;
$$;
revoke execute on function public.trail_stops_sync_count() from public, anon, authenticated;

create trigger trail_stops_sync_count
  after insert or update or delete on public.trail_stops
  for each row execute function public.trail_stops_sync_count();
