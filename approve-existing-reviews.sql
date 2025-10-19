-- Approve all existing reviews that are currently pending
UPDATE reviews
SET is_approved = true,
    approved_at = now(),
    approved_by = 'auto-approved'
WHERE is_approved = false;

