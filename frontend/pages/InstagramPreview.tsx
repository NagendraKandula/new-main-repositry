import { ImageWithFallback } from "./ui/ImageWithFallback";
import { Heart, MessageCircle, Send, MoreHorizontal, Bookmark, Plus } from "lucide-react";
const placeholderImage = "/public/instagram.png";


interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface InstagramPreviewProps {
  content: string;
  mediaItems: MediaItem[];
  contentType?: 'post' | 'reel' | 'story';
  firstComment?: string;
}

export function InstagramPreview({ content, mediaItems, contentType = 'post', firstComment }: InstagramPreviewProps) {
  const hasMedia = mediaItems.length > 0;
  const displayImage = hasMedia ? mediaItems[0].url : placeholderImage;

  // Story layout
  if (contentType === 'story') {
    return (
      <div className="h-full relative overflow-hidden rounded-2xl bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src={displayImage}
            alt="Instagram Story"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: '100%', minWidth: '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>

        {/* Story Header */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div>
                <span className="text-white text-sm font-medium drop-shadow-lg">your_account</span>
                <div className="text-white/80 text-xs drop-shadow-lg">2h</div>
              </div>
            </div>
            <MoreHorizontal className="h-6 w-6 text-white drop-shadow-lg" />
          </div>
          {/* Story Progress Bar */}
          <div className="w-full h-0.5 bg-white/40 rounded-full mt-3">
            <div className="w-3/4 h-full bg-white rounded-full drop-shadow-sm"></div>
          </div>
        </div>

        {/* Story Content */}
        {content && (
          <div className="absolute bottom-20 left-4 right-4 z-20">
            <div className="text-white text-lg font-medium bg-black/40 backdrop-blur-sm px-4 py-3 rounded-2xl drop-shadow-lg">
              {content}
            </div>
          </div>
        )}

        {/* Story Bottom Actions */}
        <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Heart className="h-6 w-6 text-white drop-shadow-lg" />
            <Send className="h-6 w-6 text-white drop-shadow-lg" />
          </div>
          <div className="text-white text-sm drop-shadow-lg">👀 156</div>
        </div>
      </div>
    );
  }

  // Reel layout  
  if (contentType === 'reel') {
    return (
      <div className="h-full relative overflow-hidden">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={displayImage}
            alt="Instagram Reel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">Reels</div>
            <MoreHorizontal className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Right Side Engagement Panel */}
        <div className="absolute right-2 bottom-20 z-10 flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center">
            <button className="p-1">
              <Heart className="h-6 w-6 text-white" />
            </button>
            <span className="text-white text-xs font-medium">24.1K</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-1">
              <MessageCircle className="h-6 w-6 text-white" />
            </button>
            <span className="text-white text-xs font-medium">1,847</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-1">
              <Send className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-1">
              <Bookmark className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <button className="p-1">
              <MoreHorizontal className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-16 z-10 p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-white text-sm font-medium">your_account</span>
              <button className="text-white border border-white/50 px-3 py-1 rounded text-xs">
                Follow
              </button>
            </div>
            
            {content && (
              <div className="text-white text-sm">
                {content}
              </div>
            )}

            {firstComment && (
              <div className="text-white text-sm opacity-90">
                <span className="font-medium">your_account</span>
                <span className="ml-2">{firstComment}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={displayImage}
          alt="Instagram content"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-white text-sm font-medium">your_account</span>
            <button className="text-white">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <MoreHorizontal className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Right Side Engagement Panel */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center space-y-4">
        {/* Like */}
        <div className="flex flex-col items-center">
          <button className="p-1">
            <Heart className="h-5 w-5 text-white" />
          </button>
          <span className="text-white text-xs font-medium">17.3K</span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center">
          <button className="p-1">
            <MessageCircle className="h-5 w-5 text-white" />
          </button>
          <span className="text-white text-xs font-medium">1,126</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <button className="p-1">
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* More */}
        <div className="flex flex-col items-center">
          <button className="p-1">
            <MoreHorizontal className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <div className="space-y-2">
          {/* Content/Caption */}
          {content && (
            <div className="text-white text-sm">
              <span className="font-medium">your_account</span>
              <span className="ml-2">{content}</span>
            </div>
          )}

          {/* First Comment for Posts */}
          {firstComment && (
            <div className="text-white text-sm opacity-90 mt-1">
              <span className="font-medium">your_account</span>
              <span className="ml-2">{firstComment}</span>
            </div>
          )}
          
          {/* Bottom Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Instagram Logo */}
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <span className="text-white text-sm">instagram</span>
            </div>

            <div className="text-center">
              <span className="text-white text-sm font-medium">instagram</span>
              <span className="text-white/70 text-sm"> •</span>
            </div>

            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}