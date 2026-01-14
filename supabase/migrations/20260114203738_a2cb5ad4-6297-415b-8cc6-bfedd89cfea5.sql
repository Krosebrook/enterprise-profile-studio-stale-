-- Create storage bucket for profile assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-assets',
  'profile-assets', 
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
);

-- RLS policies for profile-assets bucket
CREATE POLICY "Anyone can view profile assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-assets');

CREATE POLICY "Authenticated users can upload profile assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-assets' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own profile assets"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-assets'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile assets"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-assets'
  AND auth.uid()::text = (storage.foldername(name))[1]
);