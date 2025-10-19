-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  puppy_id UUID REFERENCES puppies(id) ON DELETE CASCADE,
  puppy_name TEXT NOT NULL,
  customer_name TEXT DEFAULT 'Anonymous',
  customer_email TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by TEXT
);

-- Create index for faster queries
CREATE INDEX idx_reviews_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_puppy ON reviews(puppy_id);
CREATE INDEX idx_reviews_created ON reviews(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews"
  ON reviews
  FOR SELECT
  USING (is_approved = true);

-- Policy: Anyone can insert reviews (but they start as unapproved)
CREATE POLICY "Anyone can insert reviews"
  ON reviews
  FOR INSERT
  WITH CHECK (true);

-- Policy: Authenticated users can read all reviews (for admin panel)
CREATE POLICY "Authenticated users can read all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can update reviews (for approval)
CREATE POLICY "Authenticated users can update reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete reviews
CREATE POLICY "Authenticated users can delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);

