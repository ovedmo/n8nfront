'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('Upload successful!');
        setFile(null);
        // Reset file input if possible, or just clear state
      } else {
        setMessage('Upload failed.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" onChange={handleFileChange} accept=".pdf,.txt,.md,.json" />
        <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
        {message && (
            <p className={`text-sm text-center mt-2 ${message.includes('failed') || message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
            </p>
        )}
      </CardContent>
    </Card>
  );
}
