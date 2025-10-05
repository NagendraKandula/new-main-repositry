import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MobilePreview } from "./MobilePreview";
import { 
  Send,
  Save,
  Clock
} from "lucide-react";

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
  onPublish: () => void;
  onSaveDraft: () => void;
  onSchedulePost: () => void;
  instagramContentType?: 'post' | 'reel' | 'story';
  firstComment?: string;
}

export function DynamicPreview({
  selectedChannels,
  content,
  mediaItems,
  textElements,
  onUpdateMedia,
  onUpdateText,
  onRemoveElement,
  onPublish,
  onSaveDraft,
  onSchedulePost,
  instagramContentType = 'post',
  firstComment
}: DynamicPreviewProps) {



  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3>Mobile Preview</h3>
        <Badge variant="secondary">
          {selectedChannels.length} platform{selectedChannels.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="flex-1 min-h-0">
        <MobilePreview
          selectedChannels={selectedChannels}
          content={content}
          mediaItems={mediaItems}
          instagramContentType={instagramContentType}
          firstComment={firstComment}
        />
      </div>
      
      {/* Action Bar */}
      <div className="mt-4 p-4 border-t bg-muted/10 rounded-b-lg">
        <div className="flex items-center justify-center space-x-3">
          <Button 
            onClick={onPublish}
            disabled={selectedChannels.length === 0}
            className="flex-1 max-w-32"
          >
            <Send className="h-4 w-4 mr-2" />
            Publish
          </Button>
          <Button 
            variant="outline" 
            onClick={onSaveDraft}
            className="flex-1 max-w-32"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button 
            variant="outline" 
            onClick={onSchedulePost}
            disabled={selectedChannels.length === 0}
            className="flex-1 max-w-32"
          >
            <Clock className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>
        {selectedChannels.length === 0 && (
          <p className="text-xs text-muted-foreground text-center mt-2">
            Select at least one platform to publish or schedule
          </p>
        )}
      </div>
    </div>
  );
}