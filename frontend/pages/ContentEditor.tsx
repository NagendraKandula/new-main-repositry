import React, { useState, useRef } from "react";
import { Bold, Italic, Underline, Link, Hash, AtSign, Smile } from "lucide-react";
import styles from "../styles/ContentEditor.module.css";

// Define props
export interface ContentEditorProps {
  content: string;
  onContentChange: (value: string) => void;
  files: File[];
  onFilesChange: (files: File[]) => void;
}

export default function ContentEditor({
  content,
  onContentChange,
  files,
  onFilesChange,
}: ContentEditorProps) {
  // Local UI-only state (doesn't affect preview)
  const [aiEnabled, setAiEnabled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (fileList: FileList | null) => {
    if (fileList) {
      const uploadedFiles = Array.from(fileList);
      onFilesChange([...files, ...uploadedFiles]); // update parent
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.contentEditor}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <h2 className={styles.editorTitle}>Create & Edit Content</h2>
        <div className={styles.aiToggle}>
          <span className={styles.toggleLabel}>AI Assistant</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={aiEnabled}
              onChange={() => setAiEnabled(!aiEnabled)}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button className={styles.toolBtn} title="Bold">
          <Bold className={styles.toolIcon} />
        </button>
        <button className={styles.toolBtn} title="Italic">
          <Italic className={styles.toolIcon} />
        </button>
        <button className={styles.toolBtn} title="Underline">
          <Underline className={styles.toolIcon} />
        </button>
        <button className={styles.toolBtn} title="Link">
          <Link className={styles.toolIcon} />
        </button>
        <button className={styles.toolBtn} title="Hashtag">
          <Hash className={styles.toolIcon} />
        </button>
        <button className={styles.toolBtn} title="Mention">
          <AtSign className={styles.toolIcon} />
        </button>
        <button className={styles.toolBtn} title="Emoji">
          <Smile className={styles.toolIcon} />
        </button>
      </div>

      {/* Textarea */}
      <textarea
        className={styles.editorTextarea}
        placeholder="Write your caption..."
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        rows={4}
      />

      <div className={styles.editorFooter}>
        <span className={styles.charCount}>{content.length} characters</span>
        <span className={styles.reachInfo}>Estimated reach: 3,000</span>
      </div>

      {/* Media Section */}
      <div className={styles.mediaSection}>
        <label className={styles.mediaLabel}>Media</label>

        <div className={styles.mediaGrid}>
          {files.map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const fileUrl = isImage ? URL.createObjectURL(file) : null;
            return (
              <div key={index} className={styles.mediaItem}>
                {isImage ? (
                  <img
                    src={fileUrl}
                    alt={file.name}
                    className={styles.mediaPreview}
                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                  />
                ) : (
                  <div className={styles.videoPlaceholder}>🎥 Video</div>
                )}
                <button
                  onClick={() => handleRemoveFile(index)}
                  className={styles.removeBtn}
                  aria-label="Remove file"
                >
                  ✕
                </button>
                <p className={styles.fileName}>{file.name}</p>
                <p className={styles.fileSize}>
                  {(file.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>
            );
          })}
        </div>

        {/* Enhanced Upload Area */}
        <div
          className={`${styles.uploadArea} ${isDragging ? styles.dragging : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <span>+ Add More Files</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className={styles.uploadInput}
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </div>
      </div>
    </div>
  );
}