import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MediaItem } from '../types';
import Image, { StaticImageData } from 'next/image';
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { FacebookPreview } from "./FacebookPreview";
import { InstagramPreview } from "./InstagramPreview";
import { LinkedInPreview } from "./LinkedInPreview";
import { TwitterPreview } from "./TwitterPreview";
import { ThreadsPreview } from "./ThreadsPreview";
import { PinterestPreview } from "./PinterestPreview";
import threadsIcon from "/public/threads.png";
import twitterIcon from "/public/twitter.png";
import pinterestIcon from "/public/pinterest.png";
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Local interface MediaItem has been removed to avoid conflict.
// The single source of truth is now in '../types'.

interface MobilePreviewProps {
  selectedChannels: string[];
  content: string;
  mediaItems: MediaItem[];
  instagramContentType?: 'post' | 'reel' | 'story';
  firstComment?: string;
}

// Custom Icon Components
const ThreadsIcon = ({ className }: { className?: string }) => (
  <img src={threadsIcon.src} alt="Threads" className={`${className} object-contain`} />
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <img src={twitterIcon.src} alt="Twitter/X" className={`${className} object-contain`} />
);
const PinterestIcon = ({ className }: { className?: string }) => (
  <img src={pinterestIcon.src} alt="Pinterest" className={`${className} object-contain`} />
);

const platforms = [
  { id: "twitter", name: "Twitter", icon: TwitterIcon, color: "bg-black", displayName: "X" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600", displayName: "Facebook" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500", displayName: "Instagram" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700", displayName: "LinkedIn" },
  { id: "threads", name: "Threads", icon: ThreadsIcon, color: "bg-black dark:bg-white", displayName: "Threads" },
  { id: "pinterest", name: "Pinterest", icon: PinterestIcon, color: "bg-red-600", displayName: "Pinterest" }
];

// Helper to check for StaticImageData
const isStaticImageData = (item: string | StaticImageData): item is StaticImageData => {
  return typeof item !== 'string';
}

export function MobilePreview({
  selectedChannels,
  content,
  mediaItems,
  instagramContentType = 'post',
  firstComment
}: MobilePreviewProps) {
  const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
  const activePlatforms = platforms.filter(p => selectedChannels.includes(p.id));
  const currentPlatform = activePlatforms[currentPlatformIndex];

  const nextPlatform = () => setCurrentPlatformIndex((prev) => (prev + 1) % activePlatforms.length);
  const prevPlatform = () => setCurrentPlatformIndex((prev) => (prev - 1 + activePlatforms.length) % activePlatforms.length);

  // Convert all MediaItems to a consistent type for previews
  const stringMediaItems = mediaItems.map(item => {
    return {
      // Keep existing properties
      ...item,
      // Convert StaticImageData to string URLs
      url: isStaticImageData(item.url) ? item.url.src : item.url,
      thumbnail: item.thumbnail ? (isStaticImageData(item.thumbnail) ? item.thumbnail.src : item.thumbnail) : undefined,
      
      // Provide default values for properties required by other components
      // This satisfies the `MediaItem` type from `../types.ts`
      id: item.id,
      type: item.type,
      name: (item as MediaItem).name || '', 
      size: String((item as MediaItem).size || 0), // Fix: Convert number to string
      x: (item as MediaItem).x || 0,
      y: (item as MediaItem).y || 0,
      width: (item as MediaItem).width || 0,    // ✅ Correct
      height: (item as MediaItem).height || 0,  // ✅ Correct
      rotation: (item as MediaItem).rotation || 0, // ✅ Correct

    };
  });

  const renderInstagramPreview = () => (
    <InstagramPreview 
      content={content} 
      mediaItems={stringMediaItems} 
      contentType={instagramContentType}
      firstComment={firstComment}
    />
  );
  const renderTwitterPreview = () => <TwitterPreview content={content} mediaItems={stringMediaItems} />;
  const renderFacebookPreview = () => <FacebookPreview content={content} mediaItems={stringMediaItems} />;
  const renderLinkedInPreview = () => <LinkedInPreview content={content} mediaItems={stringMediaItems} firstComment={firstComment} />;
  const renderThreadsPreview = () => <ThreadsPreview content={content} mediaItems={stringMediaItems} />;

  const renderPlatformPreview = () => {
    if (!currentPlatform) return (
      <div className="h-full bg-white flex items-center justify-center">
        <p className="text-center text-gray-500 text-sm">No platform selected</p>
      </div>
    );

    switch (currentPlatform.id) {
      case 'instagram': return renderInstagramPreview();
      case 'twitter': return renderTwitterPreview();
      case 'facebook': return renderFacebookPreview();
      case 'linkedin': return renderLinkedInPreview();
      case 'threads': return renderThreadsPreview();
      case 'pinterest': return <PinterestPreview content={content} mediaItems={stringMediaItems} />;
      default:
        return (
          <div className="h-full bg-white flex flex-col">
            <div className="p-4 border-b flex items-center space-x-3">
              <div className={`p-2 rounded-full ${currentPlatform.color} text-white`}>
                <currentPlatform.icon className="h-4 w-4" />
              </div>
              <span className="font-medium">{currentPlatform.displayName}</span>
            </div>
            <div className="flex-1 p-4">
              {content && <p className="mb-3">{content}</p>}
              {stringMediaItems.length > 0 && (
                <ImageWithFallback
                  src={stringMediaItems[0].url}
                  alt="Post media"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        );
    }
  };

  if (activePlatforms.length === 0) return (
    <div className="flex items-center justify-center h-full">
      <p className="text-center text-muted-foreground">Select platforms to see mobile preview</p>
    </div>
  );

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <div className="relative z-10">
        <div className="w-72 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="h-6 bg-black flex items-center justify-between px-6 text-white text-xs">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
            
            <div className="h-[calc(100%-1.5rem)]">
              {renderPlatformPreview()}
            </div>
          </div>
        </div>

        {activePlatforms.length > 1 && currentPlatform && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Button variant="ghost" size="sm" onClick={prevPlatform} className="h-8 w-8 p-0 text-white hover:bg-white/20">
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-2">
                <div className={`p-1.5 rounded-full ${currentPlatform.color} text-white`}>
                  <currentPlatform.icon className="h-[22px] w-[22px]" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {currentPlatformIndex + 1} of {activePlatforms.length}
                </Badge>
              </div>

              <Button variant="ghost" size="sm" onClick={nextPlatform} className="h-8 w-8 p-0 text-white hover:bg-white/20">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}