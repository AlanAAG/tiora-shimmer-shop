create table if not exists public.payments (
  id uuid default gen_random_uuid() primary key,
  payment_link_id text not null,
  product_id text not null,
  amount numeric not null,
  status text,
  short_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payments enable row level security;

-- Allow service role to do everything
create policy "Enable all for service role"
on public.payments
for all
to service_role
using (true)
with check (true);
