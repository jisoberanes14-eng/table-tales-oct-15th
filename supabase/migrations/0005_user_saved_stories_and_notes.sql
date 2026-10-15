-- Per-user saved stories and notes.
--
-- Every row belongs to the signed-in user. Row Level Security makes sure a user can only ever
-- see or change their OWN rows, no matter what the front end asks for. `user_id` defaults to the
-- caller's id (auth.uid()), so the browser never gets to choose whose row it is.

create table public.saved_stories (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  place_id text not null references public.places (id) on update cascade on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (user_id, place_id)
);
create index saved_stories_place_id_idx on public.saved_stories (place_id);

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  place_id text not null,
  -- Rules live here, not just in the UI: 1 to 1000 characters after trimming.
  text text not null check (length(btrim(text)) between 1 and 1000),
  created_at timestamptz not null default now(),
  -- A note belongs to a saved story; unsaving a story deletes its notes.
  foreign key (user_id, place_id)
    references public.saved_stories (user_id, place_id) on delete cascade
);
create index notes_story_idx on public.notes (user_id, place_id);

alter table public.saved_stories enable row level security;
alter table public.notes enable row level security;

create policy "Users read their own saved stories" on public.saved_stories
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users save stories for themselves" on public.saved_stories
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Users unsave their own stories" on public.saved_stories
  for delete to authenticated using (user_id = (select auth.uid()));

create policy "Users read their own notes" on public.notes
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users write notes for themselves" on public.notes
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Users delete their own notes" on public.notes
  for delete to authenticated using (user_id = (select auth.uid()));

-- Signed-out visitors get nothing. Signed-in users get only these operations (and RLS narrows rows).
revoke all on public.saved_stories, public.notes from anon, authenticated;
grant select, insert, delete on public.saved_stories, public.notes to authenticated;

-- "Add a note" also saves the story, atomically (both happen or neither does).
-- SECURITY INVOKER: it runs with the caller's rights, so RLS still applies to everything it does.
create function public.add_note(p_place_id text, p_text text)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user uuid := (select auth.uid());
begin
  if v_user is null then
    raise exception 'You must be signed in to add a note' using errcode = '28000';
  end if;

  insert into public.saved_stories (user_id, place_id)
    values (v_user, p_place_id)
    on conflict (user_id, place_id) do nothing;

  insert into public.notes (user_id, place_id, text)
    values (v_user, p_place_id, btrim(p_text));
end;
$$;
revoke execute on function public.add_note(text, text) from public, anon;
grant execute on function public.add_note(text, text) to authenticated;
