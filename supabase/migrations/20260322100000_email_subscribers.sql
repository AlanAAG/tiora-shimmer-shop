create table public.email_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  discount_code text,
  subscribed_at timestamptz default now(),
  source text default 'popup'
);

alter table public.email_subscribers enable row level security;

create policy "Anyone can subscribe"
  on public.email_subscribers
  for insert
  to anon, authenticated
  with check (true);

create policy "No public reads"
  on public.email_subscribers
  for select
  to anon
  using (false);
