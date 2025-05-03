-- Migrate RLS policies for gigs table (Story 13)

-- Enable RLS on the gigs table
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to SELECT open gigs
CREATE POLICY "Open gigs visible to authenticated users" 
ON gigs FOR SELECT 
USING (auth.role() = 'authenticated' AND status = 'open');

-- Policy to allow users to INSERT their own gigs
CREATE POLICY "Users can insert own gigs" 
ON gigs FOR INSERT 
WITH CHECK (auth.uid() = poster_user_id);

-- Policy to allow users to UPDATE their own gigs
CREATE POLICY "Users can update own gigs" 
ON gigs FOR UPDATE 
USING (auth.uid() = poster_user_id);

-- Policy to allow users to DELETE their own gigs
CREATE POLICY "Users can delete own gigs" 
ON gigs FOR DELETE 
USING (auth.uid() = poster_user_id);
