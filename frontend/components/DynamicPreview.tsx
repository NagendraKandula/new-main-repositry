import { useState, useRef, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "../ImageWithFallback";
import {
  Twitter, Facebook, Instagram, Linkedin, MessageCircle, Pin, Move, RotateCw, Trash2, Palette, Type, AlignLeft, Youtube as YoutubeIcon, X
} from "lucide-react";
import { cn } from "../utils";
import styles from "./DynamicPreview.module.css";

// Type definitions for Media and Text elements
interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

interface TextElement {
  id: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  color: string;
  alignment: 'left' | 'center' | 'right';
}

interface DynamicPreviewProps {
  selectedChannels: string[];
  content: string;
  mediaItems: MediaItem[];
  textElements: TextElement[];
  onUpdateMedia: (id: string, updates: Partial<MediaItem>) => void;
  onUpdateText: (id: string, updates: Partial<TextElement>) => void;
  onRemoveElement: (id: string, type: 'media' | 'text') => void;
}

export function DynamicPreview({
  selectedChannels,
  content,
  mediaItems,
  textElements,
  onUpdateMedia,
  onUpdateText,
  onRemoveElement
}: DynamicPreviewProps) {
  const [selectedElement, setSelectedElement] = useState<{id: string, type: 'media' | 'text'} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0 });

  const platforms = [
    { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-blue-400" },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
    { id: "youtube", name: "YouTube", icon: YoutubeIcon, color: "bg-red-600" },
    { id: "threads", name: "Threads", icon: MessageCircle, color: "bg-black dark:bg-white" },
    { id: "pinterest", name: "Pinterest", icon: Pin, color: "bg-red-600" }
  ];

  const activePlatforms = useMemo(() => platforms.filter(p => selectedChannels.includes(p.id)), [selectedChannels]);

  const handleMouseDown = (e: React.MouseEvent, elementId: string, type: 'media' | 'text') => {
    setSelectedElement({ id: elementId, type });
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    if (selectedElement.type === 'media') {
      const mediaItem = mediaItems.find(m => m.id === selectedElement.id);
      if (mediaItem) { onUpdateMedia(selectedElement.id, { x: mediaItem.x + deltaX, y: mediaItem.y + deltaY }); }
    } else {
      const textElement = textElements.find(t => t.id === selectedElement.id);
      if (textElement) { onUpdateText(selectedElement.id, { x: textElement.x + deltaX, y: textElement.y + deltaY }); }
    }
    dragRef.current = { startX: e.clientX, startY: e.clientY };
  };

  const handleMouseUp = () => { setIsDragging(false); };

  const renderContentWithEditableElements = (isEditable = false) => {
    const firstMedia = mediaItems[0];
    return (
      <div
        className={styles.postContentArea}
        onMouseMove={isEditable ? handleMouseMove : undefined}
        onMouseUp={isEditable ? handleMouseUp : undefined}
      >
        {content && (<div className="absolute top-4 left-4 right-4 z-10"><p className="text-sm leading-relaxed">{content}</p></div>)}
        {firstMedia && (
          <div
            key={firstMedia.id}
            className={cn(styles.movableElement, { [styles.selected]: isEditable && selectedElement?.id === firstMedia.id })}
            style={{ left: firstMedia.x, top: firstMedia.y, width: firstMedia.width, height: firstMedia.height, transform: `rotate(${firstMedia.rotation}deg)` }}
            onMouseDown={isEditable ? (e) => handleMouseDown(e, firstMedia.id, 'media') : undefined}
          >
            {firstMedia.type === 'video' ? (
              <video src={firstMedia.url} controls muted loop playsInline className="w-full h-full object-cover rounded" />
            ) : (
              <ImageWithFallback src={firstMedia.url} alt="Post media" className="w-full h-full object-cover rounded" />
            )}
            {isEditable && selectedElement?.id === firstMedia.id && (
              <div className={styles.elementControls}>
                <Button size="sm" variant="secondary" className="h-6 w-6 p-0"><Move className="h-3 w-3" /></Button>
                <Button size="sm" variant="secondary" className="h-6 w-6 p-0"><RotateCw className="h-3 w-3" /></Button>
                <Button size="sm" variant="destructive" className="h-6 w-6 p-0" onClick={() => onRemoveElement(firstMedia.id, 'media')}><Trash2 className="h-3 w-3" /></Button>
              </div>
            )}
          </div>
        )}
        {textElements.map((text) => (
          <div
            key={text.id} className={cn(styles.movableElement, { [styles.selected]: isEditable && selectedElement?.id === text.id })}
            style={{ left: text.x, top: text.y, width: text.width, height: text.height, fontSize: text.fontSize, color: text.color, textAlign: text.alignment }}
            onMouseDown={isEditable ? (e) => handleMouseDown(e, text.id, 'text') : undefined}
          >
            <p className="leading-tight">{text.content}</p>
            {isEditable && selectedElement?.id === text.id && (
              <div className={styles.elementControls}>
                <Button size="sm" variant="secondary" className="h-6 w-6 p-0"><Type className="h-3 w-3" /></Button>
                <Button size="sm" variant="secondary" className="h-6 w-6 p-0"><Palette className="h-3 w-3" /></Button>
                <Button size="sm" variant="secondary" className="h-6 w-6 p-0"><AlignLeft className="h-3 w-3" /></Button>
                <Button size="sm" variant="destructive" className="h-6 w-6 p-0" onClick={() => onRemoveElement(text.id, 'text')}><Trash2 className="h-3 w-3" /></Button>
              </div>
            )}
          </div>
        ))}
        {mediaItems.length === 0 && textElements.length === 0 && !content && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground"><p className="text-sm">Your post preview will appear here</p><p className="text-xs">Add content or media to get started</p></div>
          </div>
        )}
      </div>
    );
  };

  const renderLinkedInPreview = () => {
    const firstMedia = mediaItems[0];
    return (
      <div className={styles.previewBody}>
        <div className={styles.platformHeader}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <div>
              <p className="font-semibold text-sm">bantubilli-sai-siva-megha...</p>
              <p className="text-xs text-muted-foreground">1h • 🌍</p>
            </div>
          </div>
          <div className="ml-auto text-muted-foreground">...</div>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed">{content}</p>
          {firstMedia && (
            <div className="relative mt-4 mx-auto w-[400px] h-[300px] flex items-center justify-center">
              {firstMedia.type === 'video' ? (
                <video src={firstMedia.url} controls className="w-full h-full object-cover rounded-md" />
              ) : (
                <img src={firstMedia.url} alt="Post media" className="w-full h-full object-cover rounded-md" />
              )}
              <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => onRemoveElement(firstMedia.id, 'media')}
              >
                  <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className={styles.postFooter}>
          <div className={styles.footerActions}>
            <span>👍 Like</span><span>💬 Comment</span><span>🔄 Repost</span><span>✉️ Send</span>
          </div>
        </div>
      </div>
    );
  };
  
  const renderFacebookPreview = () => {
    const firstMedia = mediaItems[0];
    return (
      <div className={styles.previewBody}>
        <div className={styles.platformHeader}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <div>
              <p className="font-semibold text-sm">Your Name</p>
              <p className="text-xs text-muted-foreground">Just now</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed">{content}</p>
          {firstMedia && (
              <div className="relative mt-4 mx-auto w-[400px] h-[300px] flex items-center justify-center">
                {firstMedia.type === 'video' ? (
                  <video key={firstMedia.id} src={firstMedia.url} controls className="w-full h-full object-cover rounded-md" />
                ) : (
                  <img key={firstMedia.id} src={firstMedia.url} alt="Post media" className="w-full h-full object-cover rounded-md" />
                )}
                <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => onRemoveElement(firstMedia.id, 'media')}
                >
                    <X className="h-4 w-4" />
                </Button>
              </div>
          )}
        </div>
        <div className={styles.postFooter}>
          <div className={styles.footerActions}>
            <span>👍 Like</span><span>💬 Comment</span><span>↗️ Share</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTwitterPreview = () => {
    const firstMedia = mediaItems[0];
    return (
      <div className={styles.previewBody}>
        <div className={styles.platformHeader}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <div>
              <p className="font-semibold text-sm">Your Name</p>
              <p className="text-xs text-muted-foreground">@YourUsername</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed">{content}</p>
          {firstMedia && (
            <div className="relative mt-4 mx-auto w-[400px] h-[300px] flex items-center justify-center">
              {firstMedia.type === 'video' ? (
                <video key={firstMedia.id} src={firstMedia.url} controls className="w-full h-full object-cover rounded-md" />
              ) : (
                <img key={firstMedia.id} src={firstMedia.url} alt="Post media" className="w-full h-full object-cover rounded-md" />
              )}
              <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={() => onRemoveElement(firstMedia.id, 'media')}
              >
                  <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className={styles.postFooter}>
          <div className={styles.footerActions}>
            <span>💬</span><span>🔁</span><span>❤️</span>
          </div>
        </div>
      </div>
    );
  };

  const renderInstagramPreview = () => {
    const isVideo = mediaItems.some(item => item.type === 'video');
    const firstMedia = mediaItems[0];
    
    return (
      <div className={styles.previewBody}>
        {firstMedia && (
          <div className="relative mx-auto w-[400px] h-[400px] flex items-center justify-center">
            {firstMedia.type === 'video' ? (
              <video src={firstMedia.url} controls muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={firstMedia.url} alt="Post media" className="w-full h-full object-cover" />
            )}
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                  <span className="text-white text-4xl">▶️</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                <p className="font-semibold text-sm">i__maggie</p>
              </div>
              <p className="text-sm leading-relaxed">{content}</p>
            </div>
            <div className="absolute top-4 right-4 flex flex-col space-y-2 text-white">
              <span>❤️</span>
              <span>💬</span>
              <span>✉️</span>
            </div>
          </div>
        )}
        {!firstMedia && (
           <div className={styles.previewEmptyState}>
             <p>Add content to see Instagram preview</p>
           </div>
        )}
      </div>
    );
  };

  const renderYouTubeShortPreview = () => {
    const isVideo = mediaItems.some(item => item.type === 'video');
    const firstMedia = mediaItems[0];
    
    return (
      <div className={styles.previewBody}>
        {firstMedia && (
          <div className="relative w-full h-[500px] max-w-sm mx-auto">
            {firstMedia.type === 'video' ? (
              <video src={firstMedia.url} controls muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={firstMedia.url} alt="Post media" className="w-full h-full object-cover" />
            )}
            {isVideo && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                  <span className="text-white text-4xl">▶️</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <div className="text-lg font-bold mb-2">Happy Fun Dance</div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                <p>@bantubilli siva s...</p>
                <Button variant="outline" size="sm" className="bg-red-600 text-white border-red-600">Subscribe</Button>
                <div className="w-12 h-12 rounded-lg bg-gray-300 ml-auto"></div>
              </div>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col items-center space-y-4 text-white z-10">
              <div className="flex flex-col items-center">
                <span>👍</span>
                <span>Like</span>
              </div>
              <div className="flex flex-col items-center">
                <span>👎</span>
                <span>Dislike</span>
              </div>
              <div className="flex flex-col items-center">
                <span>💬</span>
                <span>Comment</span>
              </div>
              <div className="flex flex-col items-center">
                <span>Share</span>
              </div>
            </div>
          </div>
        )}
        {!firstMedia && (
           <div className={styles.previewEmptyState}>
             <p>Add content to see YouTube Short preview</p>
           </div>
        )}
      </div>
    );
  };

  const renderGenericPreview = () => {
    const firstMedia = mediaItems[0];
    return (
      <div className={styles.previewBody}>
        <div className={styles.platformHeader}>
          <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
          <div>
            <p className="font-semibold text-sm">Your Account</p>
            <p className="text-xs text-muted-foreground">Just now</p>
          </div>
        </div>
        {firstMedia ? (
          <div className="relative mx-auto w-[400px] h-[300px] flex items-center justify-center">
            {firstMedia.type === 'video' ? (
                <video key={firstMedia.id} src={firstMedia.url} controls className="w-full h-full object-cover rounded-md" />
              ) : (
                <img key={firstMedia.id} src={firstMedia.url} alt="Post media" className="w-full h-full object-cover rounded-md" />
              )}
            <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-6 w-6 p-0 rounded-full bg-black/50 hover:bg-black/70 text-white"
                onClick={() => onRemoveElement(firstMedia.id, 'media')}
            >
                <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          renderContentWithEditableElements()
        )}
        <div className={styles.postFooter}>
          <div className={styles.footerActions}>
            <span>👍 Like</span><span>💬 Comment</span><span>🔄 Share</span>
          </div>
        </div>
      </div>
    );
  };

  const renderPlatformPreview = (platformId: string) => {
    switch (platformId) {
      case 'linkedin':
        return renderLinkedInPreview();
      case 'facebook':
        return renderFacebookPreview();
      case 'twitter':
        return renderTwitterPreview();
      case 'instagram':
        return renderInstagramPreview();
      case 'youtube':
        return renderYouTubeShortPreview();
      default:
        return renderGenericPreview();
    }
  };

  if (activePlatforms.length === 0) {
    return (
      <div className={styles.previewContainer}>
        <div className={styles.previewEmptyState}>
          <p>Select platforms to see preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dynamicPreview}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Dynamic Preview</h3>
        <Badge variant="secondary">{activePlatforms.length} platform{activePlatforms.length !== 1 ? 's' : ''}</Badge>
      </div>
      {activePlatforms.length === 1 ? (
        <div className={styles.previewContainer}>{renderPlatformPreview(activePlatforms[0].id)}</div>
      ) : (
        <Tabs defaultValue={activePlatforms[0].id} className={styles.tabsContainer}>
          <TabsList className={cn(styles.tabsList, `grid-cols-${activePlatforms.length <= 6 ? activePlatforms.length : 6}`)}>
            {activePlatforms.map((platform) => (
              <TabsTrigger key={platform.id} value={platform.id} className="text-xs">
                <platform.icon className="h-3 w-3 mr-1" />{platform.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {activePlatforms.map((platform) => (
            <TabsContent key={platform.id} value={platform.id} className={styles.tabsContent}>
              {renderPlatformPreview(platform.id)}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}