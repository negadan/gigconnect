-- Migrate RLS policies for liked_gigs table (Story 14)

-- Enable RLS on the liked_gigs table
ALTER TABLE liked_gigs ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to SELECT their own liked gigs
CREATE POLICY "Users can select own liked gigs" 
ON liked_gigs FOR SELECT 
USING (auth.uid() = user_id);

-- Policy to allow users to INSERT their own liked gigs
CREATE POLICY "Users can insert own liked gigs" 
ON liked_gigs FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to DELETE their own liked gigs
CREATE POLICY "Users can delete own liked gigs" 
ON liked_gigs FOR DELETE 
USING (auth.uid() = user_id);
