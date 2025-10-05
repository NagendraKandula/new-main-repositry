import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Heart, MoreHorizontal, Share, ExternalLink, Maximize2 } from "lucide-react";
import { ImageWithFallback } from "./ui/ImageWithFallback";

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

interface PinterestPreviewProps {
  content: string;
  mediaItems: MediaItem[];
}

export function PinterestPreview({ content, mediaItems }: PinterestPreviewProps) {
  const primaryImage = mediaItems.length > 0 ? mediaItems[0] : null;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Pinterest Pin Container */}
      <div className="flex-1 p-3">
        <div className="max-w-[280px] mx-auto">
          {/* Pin Image */}
          <div className="relative group">
            <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              {primaryImage ? (
                <div className="relative">
                  <ImageWithFallback
                    src={primaryImage.url}
                    alt="Pinterest Pin"
                    className="w-full h-[350px] object-cover"
                  />
                  
                  {/* Pinterest Overlay Controls */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200">
                    {/* Top Right Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white rounded-full h-8 w-8 p-0 shadow-lg">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Bottom Action Buttons */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="flex items-center justify-between">
                        <Button 
                          size="sm" 
                          className="bg-white/90 hover:bg-white text-black rounded-full px-4 h-8 shadow-lg backdrop-blur-sm"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit site
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white text-black rounded-full h-8 w-8 p-0 shadow-lg">
                            <Share className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white text-black rounded-full h-8 w-8 p-0 shadow-lg">
                            <Maximize2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[350px] flex items-center justify-center bg-gray-100">
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                      <ExternalLink className="h-8 w-8" />
                    </div>
                    <p className="text-sm">Add an image to create your Pin</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Pin Description (Only visible when content exists) */}
            {content && (
              <div className="mt-3 px-1">
                <p className="text-sm text-gray-800 line-clamp-3 leading-relaxed">
                  {content}
                </p>
              </div>
            )}
            
            {/* Pin Metadata */}
            <div className="mt-2 px-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>pinterest.com</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pinterest Bottom Bar */}
      <div className="border-t bg-gray-50 p-3">
        <div className="flex items-center justify-center">
          <Badge variant="secondary" className="text-xs bg-red-50 text-red-700 border-red-200">
            Pinterest Pin Preview
          </Badge>
        </div>
      </div>
    </div>
  );
}