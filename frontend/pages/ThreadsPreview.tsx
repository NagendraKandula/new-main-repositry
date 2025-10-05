import { Heart, MessageCircle, Repeat2, Send, Play } from 'lucide-react';
import { ImageWithFallback } from './ui/ImageWithFallback';
import threadsIcon from '/public/threads.png';
import exampleImage from '/public/post.png';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface ThreadsPreviewProps {
  content: string;
  mediaItems: MediaItem[];
}

export function ThreadsPreview({ content, mediaItems }: ThreadsPreviewProps) {
  const hasMedia = mediaItems.length > 0;

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden rounded-xl shadow-sm border border-gray-100">
      {/* Threads Header */}
      <div className="px-4 py-4 flex items-center space-x-3 border-b border-gray-100">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
          <img src={threadsIcon.src} alt="Threads" className="w-4 h-4" />
        </div>
        <span className="text-lg font-medium text-gray-900">threads</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        {/* Text Content */}
        {content && (
          <p className="text-gray-900 text-base mb-4 leading-relaxed">{content}</p>
        )}

        {/* Media Content */}
        {hasMedia ? (
          <div className="relative rounded-2xl overflow-hidden mb-4">
            <ImageWithFallback
              src={mediaItems[0].url}
              alt="Post media"
              className="w-full h-64 object-cover"
            />
            {mediaItems[0]?.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Play className="h-8 w-8 text-black" />
                </div>
              </div>
            )}
          </div>
        ) : !content ? (
          // Show example when no content and no media
          <div className="relative rounded-2xl overflow-hidden mb-4">
            <ImageWithFallback
              src={exampleImage}
              alt="Example media"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Play className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
        <button className="flex items-center justify-center hover:bg-gray-50 rounded-full p-2 transition-colors">
          <Heart className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
        </button>

        <button className="flex items-center justify-center hover:bg-gray-50 rounded-full p-2 transition-colors">
          <MessageCircle className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
        </button>

        <button className="flex items-center justify-center hover:bg-gray-50 rounded-full p-2 transition-colors">
          <Repeat2 className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
        </button>

        <button className="flex items-center justify-center hover:bg-gray-50 rounded-full p-2 transition-colors">
          <Send className="h-6 w-6 text-gray-700" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
