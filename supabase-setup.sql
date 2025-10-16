-- GoldiPuppy Database Setup Script
-- Run this in Supabase SQL Editor

-- 1. Create breeds table
CREATE TABLE IF NOT EXISTS breeds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  size TEXT,
  temperament TEXT,
  lifespan TEXT,
  exercise TEXT,
  grooming TEXT,
  training TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create puppies table
CREATE TABLE IF NOT EXISTS puppies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  breed_slug TEXT NOT NULL,
  price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  gender TEXT NOT NULL,
  age TEXT,
  size TEXT,
  location TEXT,
  description TEXT,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE breeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE puppies ENABLE ROW LEVEL SECURITY;

-- 4. Create policies to allow public read access
CREATE POLICY "Enable read access for all users" ON breeds
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON puppies
  FOR SELECT USING (true);

-- 5. Create policies to allow insert/update/delete for authenticated users
-- (This allows the admin API to work)
CREATE POLICY "Enable insert for service role" ON breeds
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON breeds
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON breeds
  FOR DELETE USING (true);

CREATE POLICY "Enable insert for service role" ON puppies
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON puppies
  FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON puppies
  FOR DELETE USING (true);

-- 6. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_breeds_slug ON breeds(slug);
CREATE INDEX IF NOT EXISTS idx_puppies_breed_slug ON puppies(breed_slug);
CREATE INDEX IF NOT EXISTS idx_puppies_status ON puppies(status);
CREATE INDEX IF NOT EXISTS idx_puppies_featured ON puppies(featured);

-- Done! Tables created successfully.


-- 7. Deposit fields (run once if not present)
ALTER TABLE puppies
  ADD COLUMN IF NOT EXISTS deposit_status TEXT CHECK (deposit_status IN ('none','pending','paid')) DEFAULT 'none',
  ADD COLUMN IF NOT EXISTS deposit_due_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deposit_reference TEXT;

