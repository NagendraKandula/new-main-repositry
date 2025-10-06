import React from "react";
import styles from "../styles/FacebookPreview.module.css";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
}

interface FacebookPreviewProps {
  content: string;
  mediaItems: MediaItem[];
}

export function FacebookPreview({ content, mediaItems }: FacebookPreviewProps) {
  return (
    <div className={styles.container}>
      {/* Post Content */}
      <p className={styles.content}>{content}</p>

      {/* Media */}
      {mediaItems.length > 0 && (
        <div className={styles.mediaContainer}>
          {mediaItems.map((media) => (
            <img 
              key={media.id} 
              src={media.url} 
              alt="media" 
              className={styles.mediaItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
