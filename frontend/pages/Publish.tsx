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
import styles from "../styles/Publish.module.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { X as CloseIcon } from "lucide-react";


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

const sampleImage = "https://images.unsplash.com/photo-1614455774841-d7e9135c58b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFsbSUyMHRyZWUlMjBzdW1tZXJ8ZW58MXx8fHwxfDE3NTk0NzM0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

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
  // New state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState<MediaItem | null>(null);


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

  const handleSchedule = () => {
    toast.success(`Post scheduled`);
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  // Function to open the modal
  const handleMediaClick = (media: MediaItem) => {
    setModalMedia(media);
    setIsModalOpen(true);
  };

  return (
    <TooltipProvider>
      <div className={cn(styles.createPostPage, "h-screen")}>
        <ResizablePanelGroup direction="horizontal" className={styles.mainContent}>
          <ResizablePanel defaultSize={40} minSize={30}>
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
              onMediaClick={handleMediaClick}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} minSize={50} className={cn(styles.resizablePanel, styles.previewPanel)}>
            <DynamicPreview
              selectedChannels={selectedChannels}
              content={content}
              mediaItems={mediaItems}
              textElements={textElements}
              onUpdateMedia={handleUpdateMedia}
              onUpdateText={handleUpdateText}
              onRemoveElement={handleRemoveElement}
            />
            <div className="flex items-center justify-center p-4 space-x-4 border-t border-gray-200 dark:border-gray-800">
              <Button onClick={handlePublish} className="w-1/3" disabled={selectedChannels.length === 0}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
              <Button variant="outline" onClick={handleSaveDraft} className="w-1/3">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" onClick={handleSchedule} className="w-1/3" disabled={selectedChannels.length === 0}>
                <Clock className="h-4 w-4 mr-2" />
                Schedule Post
              </Button>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <Toaster position="bottom-center" />
      
      {/* The Pop-up Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          {modalMedia && (
            <>
              <div className="relative w-full h-[500px] bg-black flex items-center justify-center">
                <div className="flex items-center justify-center w-full h-full">
                  {modalMedia.type === 'video' ? (
                    <video src={modalMedia.url} controls className="max-w-full max-h-full object-contain" />
                  ) : (
                    <img src={modalMedia.url} alt={modalMedia.name} className="max-w-full max-h-full object-contain" />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white hover:text-gray-300"
                  onClick={() => setIsModalOpen(false)}
                >
                  <CloseIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="p-4">
                <DialogHeader>
                  <DialogTitle>{modalMedia.name}</DialogTitle>
                  <DialogDescription>
                    File size: {modalMedia.size}
                  </DialogDescription>
                </DialogHeader>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default Publish;