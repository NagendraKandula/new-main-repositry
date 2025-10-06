import React, { useState } from "react";
import styles from "../styles/DynamicPreview.module.css";
import { Send, Save, Clock } from "lucide-react";

interface DynamicPreviewProps {
  selectedPlatforms: string[];
  content: string; // ← NEW: accept real content
  mediaFiles: File[]; // ← NEW: accept media
  onPublish: () => void;
  onSaveDraft: () => void;
  onSchedule: () => void;
}

// Mock platform data for demo
const PLATFORM_CONFIG = {
  Facebook: { color: "#1877f2", icon: "📘" },
  Twitter: { color: "#000000", icon: "🐦" },
  Instagram: { color: "#E1306C", icon: "📸" },
  LinkedIn: { color: "#0a66c2", icon: "💼" },
  Pinterest: { color: "#bd081c", icon: "📌" },
};

export default function DynamicPreview({
  selectedPlatforms,
  content = "Embracing those perfect summer vibes! 🌴☀️ #SummerVibes",
  mediaFiles = [],
  onPublish,
  onSaveDraft,
  onSchedule,
}: DynamicPreviewProps) {
  const [activePlatform, setActivePlatform] = useState<string>(
    selectedPlatforms[0] || "Facebook"
  );

  const platform = PLATFORM_CONFIG[activePlatform as keyof typeof PLATFORM_CONFIG] || PLATFORM_CONFIG.Facebook;

  // For demo: show first image if available
  const previewImage = mediaFiles.length > 0 && mediaFiles[0].type.startsWith("image/")
    ? URL.createObjectURL(mediaFiles[0])
    : "/summer-beach.jpg";

  return (
    <div className={styles.previewContainer}>
      {/* Header */}
      <div className={styles.previewHeader}>
        <h2 className={styles.previewTitle}>Mobile Preview</h2>
        <div className={styles.platformCount}>
          {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Platform Tabs */}
      {selectedPlatforms.length > 1 && (
        <div className={styles.platformTabs}>
          {selectedPlatforms.map((plat) => (
            <button
              key={plat}
              className={`${styles.tab} ${activePlatform === plat ? styles.activeTab : ""}`}
              onClick={() => setActivePlatform(plat)}
              style={{ borderColor: PLATFORM_CONFIG[plat as keyof typeof PLATFORM_CONFIG]?.color || "#9CA3AF" }}
            >
              {PLATFORM_CONFIG[plat as keyof typeof PLATFORM_CONFIG]?.icon || plat[0]}
            </button>
          ))}
        </div>
      )}

      {/* Mobile Preview Area */}
      <div className={styles.phoneWrapper}>
        <div className={styles.phone}>
          <div className={styles.screen}>
            <div className={styles.postHeader}>
              <div
                className={styles.postLogo}
                style={{ backgroundColor: platform.color }}
              >
                {platform.icon}
              </div>
              <div className={styles.postInfo}>
                <p className={styles.postPlatform}>{activePlatform}</p>
                <span className={styles.postTime}>Just now</span>
              </div>
            </div>
            <div className={styles.postContent}>
              <p>{content || "Write your caption..."}</p>
              {mediaFiles.length > 0 && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className={styles.postImage}
                  onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} // cleanup
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className={styles.controls}>
        <button
          className={`${styles.controlButton} ${styles.publishButton}`}
          onClick={onPublish}
        >
          <Send className={styles.icon} />
          Publish
        </button>
        <button className={styles.controlButton} onClick={onSaveDraft}>
          <Save className={styles.icon} />
          Save Draft
        </button>
        <button className={styles.controlButton} onClick={onSchedule}>
          <Clock className={styles.icon} />
          Schedule
        </button>
      </div>
    </div>
  );
}