import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { 
  Calendar,
  Clock,
  Send,
  Save,
  Tag,
  Plus,
  X
} from "lucide-react";

interface PublishingOptionsProps {
  selectedChannels: string[];
  onPublish: () => void;
  onSchedule: (date: string, time: string) => void;
  onSaveDraft: () => void;
}

export function PublishingOptions({
  selectedChannels,
  onPublish,
  onSchedule,
  onSaveDraft
}: PublishingOptionsProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSchedule = () => {
    if (scheduleDate && scheduleTime) {
      onSchedule(scheduleDate, scheduleTime);
      setIsScheduling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tags Section */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <Label>Add Tags</Label>
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Enter tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={addTag} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                <span>{tag}</span>
                <button onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Scheduling Section */}
      {isScheduling ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <Label>Schedule Post</Label>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="date" className="text-xs">Date</Label>
              <Input
                id="date"
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-xs">Time</Label>
              <Input
                id="time"
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleSchedule} className="flex-1">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Post
            </Button>
            <Button variant="outline" onClick={() => setIsScheduling(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <Label>Timezones</Label>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Friday, May 17 2024 at 10:30 AM</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsScheduling(true)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Add to calendar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Separator />

      {/* Publishing Buttons */}
      <div className="space-y-3">
        <Button 
          onClick={onPublish} 
          className="w-full" 
          size="lg"
          disabled={selectedChannels.length === 0}
        >
          <Send className="h-4 w-4 mr-2" />
          Publish to {selectedChannels.length} platform{selectedChannels.length !== 1 ? 's' : ''}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsScheduling(true)}
            disabled={selectedChannels.length === 0}
          >
            <Clock className="h-4 w-4 mr-2" />
            Schedule Post
          </Button>
          
          <Button variant="outline" onClick={onSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        {selectedChannels.length === 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Select at least one platform to publish
          </p>
        )}
      </div>

      {/* Draft Status */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Draft</Badge>
          <button className="hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <button className="hover:text-foreground">Save Draft</button>
      </div>
    </div>
  );
}