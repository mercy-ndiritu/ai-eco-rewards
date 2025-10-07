-- Create storage bucket for recyclable item images
INSERT INTO storage.buckets (id, name, public) VALUES ('recyclable-images', 'recyclable-images', true);

-- Create storage policies for recyclable images
CREATE POLICY "Users can upload their own images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'recyclable-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'recyclable-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Anyone can view verified images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'recyclable-images');