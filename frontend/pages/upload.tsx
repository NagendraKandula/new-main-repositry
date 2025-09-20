// frontend/pages/upload.tsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css'; // Using existing styles for consistency
import { withAuth } from '../utils/withAuth';
import { GetServerSideProps } from 'next';

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a video file.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      // The endpoint is now /youtube/upload-video
      const response = await axios.post(
        'http://localhost:4000/youtube/upload-video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Important for sending the auth cookie
        },
      );
      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Upload a Video to YouTube</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="video">Video File</label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </main>
    </div>
  );
}

// Correct Usage: Wrap the getServerSideProps function with withAuth
export const getServerSideProps: GetServerSideProps = withAuth(async (context) => {
  // This function now handles the server-side authentication check.
  // You can fetch page-specific data here if needed.
  return {
    props: {}, // Return empty props as the page doesn't need any server-fetched data
  };
});

// Export the component as the default export
export default UploadPage;