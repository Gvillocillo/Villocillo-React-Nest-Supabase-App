-- Supabase Database Setup for Guest Book Application
-- Run this SQL in your Supabase SQL Editor to create the comments table

-- Drop the existing table if it exists (to start fresh)
DROP TABLE IF EXISTS comments CASCADE;

-- Create the comments table with the correct schema
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) > 0 AND char_length(name) <= 100),
  message TEXT NOT NULL CHECK (char_length(message) > 0 AND char_length(message) <= 500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create an index for faster sorting by created_at (newest first)
CREATE INDEX comments_created_at_idx ON comments(created_at DESC);

-- Add a sample comment to verify the table is working
INSERT INTO comments (name, message) 
VALUES ('Guest Book', 'Welcome! This is your first entry.');

-- Display all comments to verify
SELECT * FROM comments ORDER BY created_at DESC;
