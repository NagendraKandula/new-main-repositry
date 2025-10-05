import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { 
  X, 
  Edit3, 
  RotateCw, 
  Crop, 
  Filter, 
  Play,
  MoreHorizontal 
} from "lucide-react";

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  name: string;
  size: string;
}

interface MediaManagerProps {
  mediaItems: MediaItem[];
  onRemoveMedia: (id: string) => void;
  onEditMedia: (id: string) => void;
  selectedMedia?: string;
  onSelectMedia: (id: string) => void;
}

export function MediaManager({ 
  mediaItems, 
  onRemoveMedia, 
  onEditMedia,
  selectedMedia,
  onSelectMedia 
}: MediaManagerProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (mediaItems.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4>Uploaded Media</h4>
        <Badge variant="secondary">{mediaItems.length} files</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
              selectedMedia === item.id 
                ? "border-blue-500 shadow-lg" 
                : "border-transparent hover:border-muted-foreground/30"
            }`}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => onSelectMedia(item.id)}
          >
            <div className="aspect-square relative">
              <ImageWithFallback
                src={item.thumbnail || item.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="h-8 w-8 text-white fill-white" />
                </div>
              )}

              {/* Hover Controls */}
              {hoveredItem === item.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditMedia(item.id);
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  
                  {item.type === 'image' && (
                    <>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Crop className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  
                  <Button
                    size="sm"
                    variant="destructive"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveMedia(item.id);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="p-2">
              <p className="text-xs truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.size}</p>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        Browse Stock Photos
      </Button>
    </div>
  );
}