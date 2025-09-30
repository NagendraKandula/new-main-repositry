// frontend/pages/YouTubePost.tsx
import React, { useState } from "react";
import styles from "../styles/YouTubePost.module.css";
import { FaYoutube, FaUpload, FaPlus, FaSmile, FaHashtag, FaMagic, FaTimes } from "react-icons/fa";
import apiClient from "../lib/axios";
import { withAuth } from "../utils/withAuth";
import { GetServerSideProps } from "next";

const YouTubePost = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Autos & Vehicles");
  const [visibility, setVisibility] = useState("Public");
  const [postTime, setPostTime] = useState("next-available");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveVideo = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a video file.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("visibility", visibility);
    formData.append("schedule", postTime);

    try {
      const response = await apiClient.post(
        "/youtube/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setMessage(response.data.message || "Video uploaded successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <FaYoutube className={styles.youtubeIcon} />
          <h1>YouTube Dashboard</h1>
          <p className={styles.subtitle}>
            Post and manage your YouTube videos right from here.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Platform Selector */}
          <div className={styles.platformSelector}>
            <div className={`${styles.platformOption} ${styles.selected}`}>
              <FaYoutube size={24} />
            </div>
          </div>

          {/* Post Type */}
          <div className={styles.postType}>
            <span className={styles.radioLabel}>
              <input type="radio" name="postType" defaultChecked /> Short/video
            </span>
          </div>

          {/* Video Upload Area */}
          <div
            className={styles.uploadArea}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!previewUrl ? (
              <>
                <FaUpload size={32} color="#888" />
                <p>
                  Drag & drop or{" "}
                  <span
                    onClick={() => document.getElementById("fileInput")?.click()}
                  >
                    select a video
                  </span>
                </p>
                <input
                  id="fileInput"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <div className={styles.previewWrapper}>
                <video
                  src={previewUrl}
                  controls
                  className={styles.previewVideo}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={handleRemoveVideo}
                >
                  <FaTimes /> Remove
                </button>
              </div>
            )}
          </div>

          {/* Rich Text Tools */}
          <div className={styles.toolsBar}>
            <button type="button" className={styles.toolButton}>
              <FaPlus />
            </button>
            <button type="button" className={styles.toolButton}>
              <FaSmile />
            </button>
            <button type="button" className={styles.toolButton}>
              <FaHashtag />
            </button>
            <button type="button" className={`${styles.toolButton} ${styles.aiAssistantButton}`}>
  <FaMagic /> AI Assistant
</button>

            <span className={styles.charCount}>5000</span>
          </div>

          {/* Title Field */}
          {/* Title Field */}
<div className={styles.inputGroup}>
  <label>Title</label>
  <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Enter video title"
    required
  />
</div>

{/* Description Field */}
<div className={styles.inputGroup}>
  <label>Description</label>
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Enter video description..."
    rows={5}
  />
</div>


          {/* Category & Visibility */}
          <div className={styles.doubleRow}>
            <div className={styles.inputGroup}>
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Autos & Vehicles">Autos & Vehicles</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Gaming">Gaming</option>
                <option value="Music">Music</option>
                <option value="News & Politics">News & Politics</option>
                <option value="Science & Technology">Science & Technology</option>
                <option value="Sports">Sports</option>
                <option value="Travel & Events">Travel & Events</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="Public">Public</option>
                <option value="Unlisted">Unlisted</option>
                <option value="Private">Private</option>
              </select>
            </div>
          </div>

          {/* Schedule / Draft */}
          <div className={styles.scheduleSection}>
            <div className={styles.whenToPost}>
              <label>When to Post</label>
              <select
                value={postTime}
                onChange={(e) => setPostTime(e.target.value)}
              >
                <option value="next-available">Next Available</option>
                <option value="custom">Custom Date & Time</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
            <div className={styles.actionButtons}>
              <button type="button" className={styles.draftButton}>
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={loading}
                className={styles.scheduleButton}
              >
                {loading ? "Uploading..." : "Schedule Post"}
              </button>
            </div>
          </div>

          {/* Messages */}
          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  return { props: {} };
});

export default YouTubePost;
