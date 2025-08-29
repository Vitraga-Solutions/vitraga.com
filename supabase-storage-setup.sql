CREATE POLICY "Allow public uploads to job-applications bucket"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Allow public read access to job-applications bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'job-applications');

CREATE POLICY "Allow public updates to job-applications bucket"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'job-applications')
WITH CHECK (bucket_id = 'job-applications');

CREATE POLICY "Allow public deletes from job-applications bucket"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'job-applications');