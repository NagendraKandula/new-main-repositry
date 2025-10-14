// frontend/pages/TwitterPost.tsx
import React, { useState } from "react";
import styles from "../styles/TwitterPost.module.css";
import {
  FaTwitter,
  FaUpload,
  FaSmile,
  FaHashtag,
  FaMagic,
  FaTimes,
  FaComment,
  FaRetweet,
  FaHeart,
} from "react-icons/fa";
import apiClient from "../lib/axios";
import { withAuth } from "../utils/withAuth";
import { GetServerSideProps } from "next";

const TwitterPost = () => {
  const [tweetContent, setTweetContent] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [postTime, setPostTime] = useState("next-available");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Placeholder user info for preview
  const username = "bantubillisiva";
  const avatarUrl = "/Limg.png"; // Ensure this exists in public/

  // Handle media selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setMediaFile(selectedFile);
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
      setMediaFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweetContent && !mediaFile) {
      setError("Tweet cannot be empty.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData();
    formData.append("tweet", tweetContent);
    if (mediaFile) formData.append("media", mediaFile);
    formData.append("schedule", postTime);

    try {
      const response = await apiClient.post("/twitter/post-tweet", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setMessage(response.data.message || "Tweet posted successfully!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Posting failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Main Form Card */}
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <FaTwitter className={styles.twitterIcon} />
          <h1>Twitter Dashboard</h1>
          <p className={styles.subtitle}>
            Compose, schedule, and preview your tweets in one place.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Tweet Content */}
          <div className={styles.inputGroup}>
            <label>Tweet</label>
            <textarea
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              placeholder="What's happening?"
              rows={5}
              maxLength={280}
            />
            <span className={styles.charCount}>{tweetContent.length}/280</span>
          </div>

          {/* Media Upload */}
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
                    select an image/video
                  </span>
                </p>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </>
            ) : (
              <div className={styles.previewWrapper}>
                {mediaFile?.type.startsWith("video") ? (
                  <video
                    src={previewUrl}
                    controls
                    className={styles.previewMedia}
                  />
                ) : (
                  <img src={previewUrl} className={styles.previewMedia} alt="Preview" />
                )}
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={handleRemoveMedia}
                >
                  <FaTimes /> Remove
                </button>
              </div>
            )}
          </div>

          {/* Tools Bar */}
          <div className={styles.toolsBar}>
            <button type="button" className={styles.toolButton}>
              <FaSmile />
            </button>
            <button type="button" className={styles.toolButton}>
              <FaHashtag />
            </button>
            <button
              type="button"
              className={`${styles.toolButton} ${styles.aiAssistantButton}`}
            >
              <FaMagic /> AI Suggestion
            </button>
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
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className={styles.previewButton}
              >
                {showPreview ? "Hide Preview" : "Preview"}
              </button>
              <button
                type="submit"
                disabled={loading}
                className={styles.scheduleButton}
              >
                {loading ? "Posting..." : "Post Tweet"}
              </button>
            </div>
          </div>

          {/* Messages */}
          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>

      {/* Twitter Preview Panel */}
      {showPreview && (
        <div className={styles.previewPanel}>
          <h3>Tweet Preview</h3>
          <div className={styles.tweetPreview}>
            <div className={styles.tweetHeader}>
              <img
                src={avatarUrl}
                alt="Avatar"
                className={styles.avatar}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/36?text=U";
                }}
              />
              <span>@{username}</span>
            </div>
            <div className={styles.tweetContent}>
              <p>{tweetContent || "Your tweet will appear here"}</p>
              {previewUrl && (
                mediaFile?.type.startsWith("video") ? (
                  <video
                    src={previewUrl}
                    controls
                    className={styles.previewMediaContent}
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.previewMediaContent}
                  />
                )
              )}
            </div>
            <div className={styles.tweetActions}>
              <button><FaComment /></button>
              <button><FaRetweet /></button>
              <button><FaHeart /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth(async () => {
  return { props: {} };
});

export default TwitterPost;
