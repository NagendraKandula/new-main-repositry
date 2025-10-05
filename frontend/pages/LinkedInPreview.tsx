import { ImageWithFallback } from "./ui/ImageWithFallback";
import { ThumbsUp, MessageCircle, Repeat2, Send, Globe, Play, MoreHorizontal } from "lucide-react";

const profileImage = "/public/profile.png";
const exampleImage = "/public/post.png";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface LinkedInPreviewProps {
  content: string;
  mediaItems: MediaItem[];
  firstComment?: string;
}

export function LinkedInPreview({ content, mediaItems, firstComment }: LinkedInPreviewProps) {
  const hasMedia = mediaItems.length > 0;
  const media = mediaItems[0];

  return (
    <div className="h-full bg-white flex flex-col rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">in</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">LinkedIn</h3>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>now</span>
              <span>•</span>
              <Globe className="h-3 w-3" />
            </div>
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <p className="text-gray-900 text-sm">{content || "hi, travel"}</p>
      </div>

      {/* Media */}
      {hasMedia && (
        <div className="relative bg-black">
          <ImageWithFallback
            src={media.url || exampleImage}
            alt="Post media"
            className="w-full h-48 object-cover"
          />
          {media.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white">
                <Play className="h-8 w-8 text-white ml-1" fill="white" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* First Comment */}
      {firstComment && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-start space-x-3">
            <ImageWithFallback
              src={profileImage}
              alt="Your profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                <div className="text-xs font-medium text-gray-900 mb-1">Matteo Giardino</div>
                <p className="text-xs text-gray-800">{firstComment}</p>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <button className="hover:text-blue-600">Like</button>
                <button className="hover:text-blue-600">Reply</button>
                <span>now</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-2 py-3 border-t border-gray-100">
        <div className="flex justify-between">
          <button className="flex items-center justify-center space-x-1 px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors min-w-0">
            <ThumbsUp className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            <span className="text-xs text-gray-600">Like</span>
          </button>

          <button className="flex items-center justify-center space-x-1 px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors min-w-0">
            <MessageCircle className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            <span className="text-xs text-gray-600">Comment</span>
          </button>

          <button className="flex items-center justify-center space-x-1 px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors min-w-0">
            <Repeat2 className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            <span className="text-xs text-gray-600">Repost</span>
          </button>

          <button className="flex items-center justify-center space-x-1 px-1 py-2 hover:bg-gray-50 rounded-lg transition-colors min-w-0">
            <Send className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
            <span className="text-xs text-gray-600">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
