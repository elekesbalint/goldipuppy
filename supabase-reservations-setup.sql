-- Reservations table for user-managed reservations
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  puppy_id uuid not null references public.puppies (id) on delete cascade,
  status text not null check (status in ('pending','paid','cancelled','expired')) default 'pending',
  deposit_due_at timestamptz,
  created_at timestamptz not null default now(),
  cancelled_at timestamptz
);

-- Basic indexes
create index if not exists reservations_user_id_idx on public.reservations (user_id);
create index if not exists reservations_puppy_id_idx on public.reservations (puppy_id);
create index if not exists reservations_status_idx on public.reservations (status);

-- Enable RLS
alter table public.reservations enable row level security;

-- Policies: users can see/manage only their reservations; anon cannot insert directly
do $$ begin
  if not exists (
    select 1 from pg_policies where tablename = 'reservations' and policyname = 'Users can view own reservations'
  ) then
    create policy "Users can view own reservations"
      on public.reservations for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'reservations' and policyname = 'Users can insert own reservations'
  ) then
    create policy "Users can insert own reservations"
      on public.reservations for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'reservations' and policyname = 'Users can update own reservations'
  ) then
    create policy "Users can update own reservations"
      on public.reservations for update
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where tablename = 'reservations' and policyname = 'Users can delete own reservations (within 2 days)'
  ) then
    create policy "Users can delete own reservations (within 2 days)"
      on public.reservations for delete
      using (auth.uid() = user_id and now() <= deposit_due_at);
  end if;
end $$;


