import React, { useState } from "react";
import { X, Calendar, Clock, Send, Save, Tag, Plus, Twitter, Facebook, Instagram, Linkedin, MessageCircle, Pin } from "lucide-react";
import { toast, Toaster as Sonner } from "sonner";
import { cn } from "../utils";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ChannelSelector } from "../components/ChannelSelector";
import { ContentEditor } from "../components/ContentEditor";
import { MediaManager } from "../components/MediaManager";
import { DynamicPreview } from "../components/DynamicPreview";
import { PublishingOptions } from "../components/PublishingOptions";
import styles from "../styles/Publish.module.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Defining types needed for the page
interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  name: string;
  size: string;
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

// Utility components directly in this file
const TooltipProvider = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) => {
  return <TooltipPrimitive.Provider {...props} />;
};

const Toaster = ({ ...props }) => {
    return <Sonner {...props} />;
};

const sampleImage = "https://images.unsplash.com/photo-1614455774841-d7e9135c58b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFsbSUyMHRyZWVzJTIwc3VtbWVyfGVufDF8fHx8MTc1OTQ3MzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const Publish = () => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['twitter', 'facebook', 'instagram']);
  const [content, setContent] = useState("Embracing those perfect summer vibes! 🌴☀️ There's nothing quite like the feeling of warm sand between your toes and the sound of waves crashing nearby. #SummerVibes #BeachLife #Paradise");
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([{
    id: '1',
    type: 'image',
    url: sampleImage,
    name: 'summer-beach.jpg',
    size: '2.4 MB',
    x: 50,
    y: 100,
    width: 200,
    height: 150,
    rotation: 0
  }]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | undefined>();

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };
  
  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file, index) => {
      const newMedia: MediaItem = {
        id: Date.now() + index.toString(),
        type: file.type.startsWith('video/') ? 'video' : 'image',
        url: URL.createObjectURL(file),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        x: 50,
        y: 100,
        width: 200,
        height: 150,
        rotation: 0
      };
      setMediaItems(prev => [...prev, newMedia]);
    });
    toast.success(`${files.length} file(s) uploaded successfully`);
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
    if (selectedMedia === id) {
      setSelectedMedia(undefined);
    }
    toast.success("Media removed");
  };

  const handleEditMedia = (id: string) => {
    toast.info("Media editor would open here");
  };

  const handleUpdateMedia = (id: string, updates: Partial<MediaItem>) => {
    setMediaItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const handleUpdateText = (id: string, updates: Partial<TextElement>) => {
    setTextElements(prev =>
      prev.map(element =>
        element.id === id ? { ...element, ...updates } : element
      )
    );
  };

  const handleRemoveElement = (id: string, type: 'media' | 'text') => {
    if (type === 'media') {
      handleRemoveMedia(id);
    } else {
      setTextElements(prev => prev.filter(element => element.id !== id));
    }
  };

  const handlePublish = () => {
    toast.success(`Post published to ${selectedChannels.length} platforms!`);
  };

  const handleSchedule = (date: string, time: string) => {
    toast.success(`Post scheduled for ${date} at ${time}`);
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  return (
    <TooltipProvider>
      <div className={cn(styles.createPostPage, "h-screen")}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className="text-xl">Create Post</h1>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Badge variant="outline" className="mr-2">Add Tags</Badge>
              </Button>
              <Badge variant="outline" className="flex items-center space-x-2">
                <span>Draft</span>
                <X className="h-3 w-3 cursor-pointer" />
              </Badge>
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            </div>
          </div>
        </div>
        <ResizablePanelGroup direction="horizontal" className={styles.mainContent}>
          <ResizablePanel defaultSize={30} minSize={25} maxSize={40} className={cn(styles.resizablePanel, styles.contentEditorPanel)}>
            <ContentEditor
              selectedChannels={selectedChannels}
              onChannelToggle={handleChannelToggle}
              content={content}
              onContentChange={setContent}
              aiAssistantEnabled={aiAssistantEnabled}
              onAiToggle={setAiAssistantEnabled}
              onFileUpload={handleFileUpload}
            />
            <MediaManager
              mediaItems={mediaItems}
              onRemoveMedia={handleRemoveMedia}
              onEditMedia={handleEditMedia}
              selectedMedia={selectedMedia}
              onSelectMedia={setSelectedMedia}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40} className={cn(styles.resizablePanel, styles.previewPanel)}>
            <DynamicPreview
              selectedChannels={selectedChannels}
              content={content}
              mediaItems={mediaItems}
              textElements={textElements}
              onUpdateMedia={handleUpdateMedia}
              onUpdateText={handleUpdateText}
              onRemoveElement={handleRemoveElement}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={15} minSize={10} maxSize={20} className={cn(styles.resizablePanel, styles.publishingOptionsPanel)}>
            <PublishingOptions
              selectedChannels={selectedChannels}
              onPublish={handlePublish}
              onSchedule={handleSchedule}
              onSaveDraft={handleSaveDraft}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Toaster position="bottom-center" />
    </TooltipProvider>
  );
};

export default Publish;