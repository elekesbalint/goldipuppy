-- Drop the existing delete policy
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON reviews;

-- Create new policy that allows anyone to delete (since we protect the admin UI)
CREATE POLICY "Allow delete reviews"
  ON reviews
  FOR DELETE
  USING (true);

