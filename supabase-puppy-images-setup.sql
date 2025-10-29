-- Create table to store multiple images per puppy
create table if not exists public.puppy_images (
  id uuid primary key default gen_random_uuid(),
  puppy_id uuid not null references public.puppies(id) on delete cascade,
  url text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Helpful index for lookups
create index if not exists idx_puppy_images_puppy_id on public.puppy_images(puppy_id);
create index if not exists idx_puppy_images_sort on public.puppy_images(puppy_id, sort_order);

-- RLS (mirror puppies table openness; adjust if you lock down anon)
alter table public.puppy_images enable row level security;

-- Simple permissive policies (anon read; service key writes via API routes)
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'puppy_images' and policyname = 'Allow read for all'
  ) then
    create policy "Allow read for all" on public.puppy_images for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'puppy_images' and policyname = 'Allow write for service role only'
  ) then
    create policy "Allow write for service role only" on public.puppy_images for all
      using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
end$$;


