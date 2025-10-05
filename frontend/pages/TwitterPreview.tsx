import { ImageWithFallback } from "./ui/ImageWithFallback";
import { MessageCircle, Repeat2, Heart, Bookmark, Share, MoreHorizontal, Play } from "lucide-react";
import exampleImage from "/public/post.png";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface TwitterPreviewProps {
  content: string;
  mediaItems: MediaItem[];
}

export function TwitterPreview({ content, mediaItems }: TwitterPreviewProps) {
  const hasMedia = mediaItems.length > 0;

  return (
    <div className="h-full bg-white flex flex-col overflow-y-auto rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-black">Twitter/X</h3>
            <p className="text-gray-500 text-sm">twitter</p>
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-400" />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-4 space-y-6">
        {/* Text Content */}
        {content && (
          <p className="text-black leading-relaxed">{content}</p>
        )}

        {/* Media Content */}
        {hasMedia || content ? (
          <div className="relative rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={hasMedia ? mediaItems[0].url : exampleImage}
              alt="Post media"
              className="w-full h-64 object-cover"
            />
            {(hasMedia && mediaItems[0].type === 'video') && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 transition-colors cursor-pointer">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Action Buttons */}
        <div className="pt-3 flex justify-between max-w-xs">
          <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group">
            <MessageCircle className="h-4 w-4 text-gray-500 group-hover:text-blue-500" strokeWidth={1.5} />
            <span className="text-xs text-gray-500 group-hover:text-blue-500">3</span>
          </button>

          <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group">
            <Repeat2 className="h-4 w-4 text-gray-500 group-hover:text-green-500" strokeWidth={1.5} />
            <span className="text-xs text-gray-500 group-hover:text-green-500">1</span>
          </button>

          <button className="flex items-center space-x-1 hover:bg-gray-100 rounded-full p-2 transition-colors group">
            <Heart className="h-4 w-4 text-gray-500 group-hover:text-red-500" strokeWidth={1.5} />
            <span className="text-xs text-gray-500 group-hover:text-red-500">7</span>
          </button>

          <button className="hover:bg-gray-100 rounded-full p-2 transition-colors group">
            <Bookmark className="h-4 w-4 text-gray-500 group-hover:text-blue-500" strokeWidth={1.5} />
          </button>

          <button className="hover:bg-gray-100 rounded-full p-2 transition-colors group">
            <Share className="h-4 w-4 text-gray-500 group-hover:text-blue-500" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
