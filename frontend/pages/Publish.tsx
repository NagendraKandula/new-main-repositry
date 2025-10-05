
import { useState } from "react";
import { ChannelSelector } from "./ChannelSelector";
import { ContentEditor } from "./ContentEditor";
import { DynamicPreview } from "./DynamicPreview";
import { Toaster, toast } from "sonner";


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

export default function Publish() {
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['twitter', 'facebook', 'instagram', 'linkedin', 'threads', 'pinterest']);
  const [content, setContent] = useState("");
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string | undefined>();
  const [instagramContentType, setInstagramContentType] = useState<'post' | 'reel' | 'story'>('post');
  const [firstComment, setFirstComment] = useState("");

  // Sample summer vibes image
  const sampleImage = "https://images.unsplash.com/photo-1614455774841-d7e9135c58b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFsbSUyMHRyZWVzJTIwc3VtbWVyfGVufDF8fHx8MTc1OTQ3MzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Initialize with sample content
  useState(() => {
    setContent("Embracing those perfect summer vibes! 🌴☀️ There's nothing quite like the feeling of warm sand between your toes and the sound of waves crashing nearby. #SummerVibes #BeachLife #Paradise");
    
    setMediaItems([{
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
  });

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleSelectAll = () => {
    const allChannels = ['twitter', 'facebook', 'instagram', 'linkedin', 'threads', 'pinterest'];
    setSelectedChannels(prev => 
      prev.length === allChannels.length ? [] : allChannels
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
        x: 50 + (index * 20),
        y: 100 + (index * 20),
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

  const handleSchedulePost = () => {
    toast.info("Schedule dialog would open here");
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex h-screen">
        {/* Content Editor Section */}
        <div className="w-[40%] border-r flex flex-col">
          {/* Channel Selection */}
          <div className="border-b bg-muted/20 p-4">
            <ChannelSelector
              selectedChannels={selectedChannels}
              onChannelToggle={handleChannelToggle}
              onSelectAll={handleSelectAll}
            />
          </div>

          {/* Content Editor */}
          <div className="flex-1 p-4 overflow-y-auto">
            <ContentEditor
              content={content}
              onContentChange={setContent}
              aiAssistantEnabled={aiAssistantEnabled}
              onAiToggle={setAiAssistantEnabled}
              onFileUpload={handleFileUpload}
              mediaItems={mediaItems}
              onRemoveMedia={handleRemoveMedia}
              onEditMedia={handleEditMedia}
              selectedMedia={selectedMedia}
              onSelectMedia={setSelectedMedia}
              selectedChannels={selectedChannels}
              instagramContentType={instagramContentType}
              onInstagramContentTypeChange={setInstagramContentType}
              firstComment={firstComment}
              onFirstCommentChange={setFirstComment}
            />
          </div>
        </div>

        {/* Dynamic Preview Section */}
        <div className="flex-1 p-4">
          <DynamicPreview
            selectedChannels={selectedChannels}
            content={content}
            mediaItems={mediaItems}
            textElements={textElements}
            onUpdateMedia={handleUpdateMedia}
            onUpdateText={handleUpdateText}
            onRemoveElement={handleRemoveElement}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
            onSchedulePost={handleSchedulePost}
            instagramContentType={instagramContentType}
            firstComment={firstComment}
          />
        </div>
      </div>
    </div>
  );
}