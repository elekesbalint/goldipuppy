-- Safely add Date of Birth and Weight columns to puppies table
-- Run this in Supabase SQL editor.

alter table public.puppies
  add column if not exists dob date null,
  add column if not exists weight text null;

-- Optional: backfill examples
-- update public.puppies set weight = '3.2 kg' where weight is null;


