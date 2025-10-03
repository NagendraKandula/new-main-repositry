import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "../ImageWithFallback";
import { X, Edit3, RotateCw, Crop, Filter, Play } from "lucide-react";
import styles from "./MediaManager.module.css";
import { cn } from "../utils";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  name: string;
  size: string;
}

interface MediaManagerProps {
  mediaItems: MediaItem[];
  onRemoveMedia: (id: string) => void;
  onEditMedia: (id: string) => void;
  selectedMedia?: string;
  onSelectMedia: (id: string) => void;
}

export function MediaManager({
  mediaItems,
  onRemoveMedia,
  onEditMedia,
  selectedMedia,
  onSelectMedia
}: MediaManagerProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (mediaItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.mediaManager}>
      <div className={styles.header}>
        <h4 className={styles.headerTitle}>Uploaded Media</h4>
        <Badge variant="secondary">{mediaItems.length} files</Badge>
      </div>
      <div className={styles.mediaGrid}>
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className={cn(styles.mediaItem, { [styles.selected]: selectedMedia === item.id })}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => onSelectMedia(item.id)}
          >
            <div className={styles.mediaPreviewContainer}>
              <ImageWithFallback
                src={item.thumbnail || item.url}
                alt={item.name}
                className={styles.mediaPreview}
              />
              {item.type === 'video' && (
                <div className={styles.videoOverlay}>
                  <Play className={styles.videoPlayIcon} />
                </div>
              )}
              {hoveredItem === item.id && (
                <div className={styles.hoverControls}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditMedia(item.id);
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  {item.type === 'image' && (
                    <>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0"><RotateCw className="h-4 w-4" /></Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0"><Crop className="h-4 w-4" /></Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0"><Filter className="h-4 w-4" /></Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveMedia(item.id);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className={styles.mediaInfo}>
              <p className={styles.mediaName}>{item.name}</p>
              <p className={styles.mediaSize}>{item.size}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className={styles.stockPhotosButton}>
        Browse Stock Photos
      </Button>
    </div>
  );
}