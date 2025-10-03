import { useState, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import {
  Bold, Italic, Underline, Link, Hash, AtSign, Smile, Sparkles, Upload, Image as ImageIcon
} from "lucide-react";
import { Separator } from "./ui/separator";
import { ChannelSelector } from "./ChannelSelector";
import styles from "./ContentEditor.module.css";
import { cn } from "../utils";

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  aiAssistantEnabled: boolean;
  onAiToggle: (enabled: boolean) => void;
  onFileUpload: (files: FileList) => void;
  selectedChannels: string[];
  onChannelToggle: (channelId: string) => void;
}

export function ContentEditor({
  content,
  onContentChange,
  aiAssistantEnabled,
  onAiToggle,
  onFileUpload,
  selectedChannels,
  onChannelToggle
}: ContentEditorProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileUpload(e.target.files);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatOptions = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Link, label: "Link" },
    { icon: Hash, label: "Hashtag" },
    { icon: AtSign, label: "Mention" },
    { icon: Smile, label: "Emoji" }
  ];

  return (
    <div className={styles.contentEditor}>
      <h3 className={styles.title}>Select All</h3>
      <ChannelSelector selectedChannels={selectedChannels} onChannelToggle={onChannelToggle} />
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Content</h3>
        <div className={styles.aiToggleContainer}>
          <span className={styles.aiToggleLabel}>AI Assistant</span>
          <Switch checked={aiAssistantEnabled} onCheckedChange={onAiToggle} />
        </div>
      </div>
      
      <div className={styles.contentArea}>
        <Textarea
          placeholder="What's on your mind? Share your thoughts, ideas, or updates..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <div className={styles.formattingToolbar}>
          {formatOptions.map((option, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <option.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>
        <div
          className={
            cn(styles.mediaUploadArea, { [styles.dragOver]: dragOver })
          }
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className={styles.mediaUploadIcon} />
          <p className={styles.mediaUploadText}>
            Drag & drop images, videos, or GIFs
          </p>
          {/* We now have a hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*,video/*"
            className="hidden" // Hides the default input
          />
          <Button variant="outline" size="sm" onClick={handleButtonClick}>
            <ImageIcon className="h-4 w-4 mr-2" />
            Browse Files
          </Button>
        </div>
        <div className={styles.proTipsContainer}>
          <Badge variant="secondary" className={styles.proTipsBadge}>
            💡 Pro Tips
          </Badge>
          <p className={styles.proTipsText}>
            Use relevant hashtags. Post when audience is active.
            Include engaging visuals.
          </p>
        </div>
      </div>
      <Separator />
      <div className={styles.statsSection}>
        <span>{content.length} characters</span>
        <span>Estimated reach: 3,000</span>
      </div>
    </div>
  );
}