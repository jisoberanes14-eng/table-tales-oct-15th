-- "Mark as closed": signed-in people REPORT a place as closed; an admin confirms.
--
--   places.is_closed            Public, shown as a "Closed" label. Only admins can change it
--                               (the browser has no write access to places at all).
--   place_closure_reports       One report per person per place. Each person can see, add, and
--                               withdraw only THEIR OWN reports. Admins review all of them in the
--                               Supabase dashboard (table editor), which bypasses these rules.

alter table public.places add column is_closed boolean not null default false;

create table public.place_closure_reports (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  place_id text not null references public.places (id) on update cascade on delete cascade,
  reported_at timestamptz not null default now(),
  primary key (user_id, place_id)
);
create index place_closure_reports_place_id_idx on public.place_closure_reports (place_id);

alter table public.place_closure_reports enable row level security;

create policy "Users read their own closure reports" on public.place_closure_reports
  for select to authenticated using (user_id = (select auth.uid()));
create policy "Users report closures as themselves" on public.place_closure_reports
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "Users withdraw their own closure reports" on public.place_closure_reports
  for delete to authenticated using (user_id = (select auth.uid()));

revoke all on public.place_closure_reports from anon, authenticated;
grant select, insert, delete on public.place_closure_reports to authenticated;
