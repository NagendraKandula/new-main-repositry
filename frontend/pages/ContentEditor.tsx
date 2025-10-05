import { useState, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { FileUploadMenu } from "./FileUploadMenu";
import {
  Bold,
  Italic,
  Underline,
  Link,
  Hash,
  AtSign,
  Smile,
  Sparkles,
  Upload,
  Image as ImageIcon,
  X,
  Edit3,
  Play,
  Plus,
} from "lucide-react";
import { Separator } from "./ui/separator";

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  name: string;
  size: string;
}

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  aiAssistantEnabled: boolean;
  onAiToggle: (enabled: boolean) => void;
  onFileUpload: (files: FileList) => void;
  mediaItems: MediaItem[];
  onRemoveMedia: (id: string) => void;
  onEditMedia: (id: string) => void;
  selectedMedia?: string;
  onSelectMedia: (id: string) => void;
  selectedChannels: string[];
  instagramContentType?: "post" | "reel" | "story";
  onInstagramContentTypeChange?: (
    type: "post" | "reel" | "story",
  ) => void;
  firstComment?: string;
  onFirstCommentChange?: (comment: string) => void;
}

export function ContentEditor({
  content,
  onContentChange,
  aiAssistantEnabled,
  onAiToggle,
  onFileUpload,
  mediaItems,
  onRemoveMedia,
  onEditMedia,
  selectedMedia,
  onSelectMedia,
  selectedChannels,
  instagramContentType = "post",
  onInstagramContentTypeChange,
  firstComment = "",
  onFirstCommentChange,
}: ContentEditorProps) {
  const [dragOver, setDragOver] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
      // Reset the input value so the same file can be selected again
      e.target.value = "";
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const insertTextAtCursor = (
    before: string,
    after: string = "",
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    const newText =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end);
    onContentChange(newText);

    // Reset cursor position after the inserted text
    setTimeout(() => {
      if (textarea) {
        const newCursorPos =
          start +
          before.length +
          selectedText.length +
          after.length;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }
    }, 0);
  };

  const handleFormatting = (type: string) => {
    switch (type) {
      case "bold":
        insertTextAtCursor("**", "**");
        break;
      case "italic":
        insertTextAtCursor("*", "*");
        break;
      case "underline":
        insertTextAtCursor("<u>", "</u>");
        break;
      case "link":
        const url = prompt("Enter URL:");
        if (url) {
          insertTextAtCursor(`[`, `](${url})`);
        }
        break;
      case "hashtag":
        insertTextAtCursor("#");
        break;
      case "mention":
        insertTextAtCursor("@");
        break;
      case "emoji":
        insertTextAtCursor("😊");
        break;
    }
  };

  const formatOptions = [
    { icon: Bold, label: "Bold", action: "bold" },
    { icon: Italic, label: "Italic", action: "italic" },
    {
      icon: Underline,
      label: "Underline",
      action: "underline",
    },
    { icon: Link, label: "Link", action: "link" },
    { icon: Hash, label: "Hashtag", action: "hashtag" },
    { icon: AtSign, label: "Mention", action: "mention" },
    { icon: Smile, label: "Emoji", action: "emoji" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3>Content</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            AI Assistant
          </span>
          <Switch
            checked={aiAssistantEnabled}
            onCheckedChange={onAiToggle}
          />
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center space-x-1 p-2 border rounded-lg bg-muted/30 mb-3">
        {formatOptions.map((option, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-accent/80 transition-colors"
            onClick={() => handleFormatting(option.action)}
            title={option.label}
          >
            <option.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder="What's on your mind? Share your thoughts, ideas, or updates..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            className="min-h-[100px] resize-none pb-8"
          />
          {/* Character count and estimated reach inside text area */}
          <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-xs text-muted-foreground">
            <span>{content.length} characters</span>
            <span>Estimated reach: 3,000</span>
          </div>
        </div>

        {/* Instagram-specific controls */}
        {selectedChannels.includes("instagram") && (
          <div className="space-y-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">
                Instagram Content Type
              </Label>
              <div className="w-32">
                <Select
                  value={instagramContentType}
                  onValueChange={(
                    value: "post" | "reel" | "story",
                  ) => onInstagramContentTypeChange?.(value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">
                      📷 Post
                    </SelectItem>
                    <SelectItem value="reel">
                      🎬 Reel
                    </SelectItem>
                    <SelectItem value="story">
                      📱 Story
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* First Comment for Posts and Reels */}
            {(instagramContentType === "post" ||
              instagramContentType === "reel") && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  First Comment (Optional)
                </Label>
                <Input
                  placeholder="Add your first comment to boost engagement..."
                  value={firstComment}
                  onChange={(e) =>
                    onFirstCommentChange?.(e.target.value)
                  }
                  className="h-8"
                />
                <p className="text-xs text-muted-foreground">
                  💡 First comments help your post get more
                  visibility in the algorithm
                </p>
              </div>
            )}
          </div>
        )}

        {/* LinkedIn-specific controls */}
        {selectedChannels.includes("linkedin") && (
          <div className="space-y-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                💼 LinkedIn First Comment (Optional)
              </Label>
              <Input
                placeholder="Add a professional first comment to drive engagement..."
                value={firstComment}
                onChange={(e) =>
                  onFirstCommentChange?.(e.target.value)
                }
                className="h-8"
              />
              <p className="text-xs text-muted-foreground">
                💡 Professional first comments help establish
                thought leadership and drive meaningful
                conversations
              </p>
            </div>
          </div>
        )}

        {aiAssistantEnabled && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm">AI Assistant</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Generate Caption
              </Button>
              <Button variant="outline" size="sm">
                Rewrite
              </Button>
              <Button variant="outline" size="sm">
                Suggest Hashtags
              </Button>
            </div>
          </div>
        )}

        {/* Media Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg transition-colors ${
            dragOver
              ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
              : "border-muted-foreground/30 hover:border-muted-foreground/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {mediaItems.length === 0 ? (
            <div className="p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag & drop images, videos, or GIFs
              </p>
              <FileUploadMenu
                onFileUpload={onFileUpload}
                triggerText="Browse Files"
                triggerIcon={
                  <ImageIcon className="h-4 w-4 mr-2" />
                }
              />
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Media</span>
                </div>
                <Badge variant="secondary">
                  {mediaItems.length} files
                </Badge>
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

                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="h-6 w-6 text-white fill-white" />
                        </div>
                      )}

                      {/* Hover Controls */}
                      {hoveredItem === item.id && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditMedia(item.id);
                            }}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveMedia(item.id);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="p-2">
                      <p className="text-xs truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.size}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <FileUploadMenu
                onFileUpload={onFileUpload}
                triggerText="Add More Files"
                triggerIcon={<Plus className="h-4 w-4 mr-2" />}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Pro Tips */}
        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <Badge variant="secondary" className="mb-2">
            💡 Pro Tips
          </Badge>
          <p className="text-sm text-muted-foreground">
            Use relevant hashtags. Post when audience is active.
            Include engaging visuals.
          </p>
        </div>
      </div>
    </div>
  );
}