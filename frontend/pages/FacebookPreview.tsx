import { ImageWithFallback } from "./ui/ImageWithFallback";
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Play } from "lucide-react";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface FacebookPreviewProps {
  content: string;
  mediaItems: MediaItem[];
}

export function FacebookPreview({ content, mediaItems }: FacebookPreviewProps) {
  const hasMedia = mediaItems.length > 0;
  const firstMedia = hasMedia ? mediaItems[0] : null;

  // Placeholder image path in public folder
  const placeholderImage = "/images/facebook.png"; // put your placeholder here

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Facebook Header */}
      <div className="flex items-center justify-between p-3 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Facebook</div>
            <div className="text-xs text-gray-500">Just now</div>
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-600" />
      </div>

      {/* Post Content */}
      <div className="flex-1 px-3">
        {content && <p className="text-gray-900 text-sm mb-3">{content}</p>}

        {/* Media Content */}
        <div className="relative rounded-lg overflow-hidden bg-gray-100 mb-3">
          <ImageWithFallback
            src={hasMedia ? firstMedia.url : placeholderImage}
            alt="Post media"
            className="w-full h-48 object-cover"
          />
          {hasMedia && firstMedia.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center">
                <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>
          )}
          {!hasMedia && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center">
                <Play className="h-8 w-8 text-white ml-1" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* Engagement Actions */}
        <div className="border-t border-gray-200 pt-2 pb-2">
          <div className="flex items-center">
            <button className="flex items-center justify-center space-x-1 px-3 py-2 hover:bg-gray-50 rounded-lg flex-1 transition-colors">
              <ThumbsUp className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Like</span>
            </button>
            <button className="flex items-center justify-center space-x-1 px-3 py-2 hover:bg-gray-50 rounded-lg flex-1 transition-colors">
              <MessageCircle className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Comment</span>
            </button>
            <button className="flex items-center justify-center space-x-1 px-3 py-2 hover:bg-gray-50 rounded-lg flex-1 transition-colors">
              <Share2 className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
