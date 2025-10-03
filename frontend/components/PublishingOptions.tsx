import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
  Calendar, Clock, Send, Save, Tag, Plus, X
} from "lucide-react";
import { cn } from "../utils";
import styles from "./PublishingOptions.module.css";

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

  const handleScheduleClick = () => {
    if (scheduleDate && scheduleTime) {
      onSchedule(scheduleDate, scheduleTime);
      setIsScheduling(false);
    }
  };

  return (
    <div className={styles.publishingOptions}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <Tag className="h-4 w-4" />
          <Label>Add Tags</Label>
        </div>
        <div className={styles.tagInputContainer}>
          <Input
            placeholder="Enter tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.tagInput}
          />
          <Button onClick={addTag} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className={styles.tagsList}>
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className={cn("flex items-center space-x-1", styles.tagBadge)}>
                <span>{tag}</span>
                <button onClick={() => removeTag(tag)} className={cn("ml-1 hover:text-destructive", styles.tagRemoveButton)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
      <Separator />
      {isScheduling ? (
        <div className={styles.schedulingContainer}>
          <div className={styles.sectionHeader}>
            <Calendar className="h-4 w-4" />
            <Label>Schedule Post</Label>
          </div>
          <div className={styles.schedulingInputs}>
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
          <div className={styles.scheduleButtonContainer}>
            <Button onClick={handleScheduleClick} className={styles.scheduleButton}>
              <Clock className="h-4 w-4 mr-2" />
              Schedule Post
            </Button>
            <Button variant="outline" onClick={() => setIsScheduling(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Clock className="h-4 w-4" />
            <Label>Timezones</Label>
          </div>
          <div className={styles.timezoneDisplay}>
            <div className={styles.timezoneContent}>
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
      <div className={styles.publishingButtons}>
        <Button
          onClick={onPublish}
          className={styles.publishButton}
          size="lg"
          disabled={selectedChannels.length === 0}
        >
          <Send className="h-4 w-4 mr-2" />
          Publish to {selectedChannels.length} platform{selectedChannels.length !== 1 ? 's' : ''}
        </Button>
        <div className={styles.secondaryButtons}>
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
          <p className={styles.disabledMessage}>
            Select at least one platform to publish
          </p>
        )}
      </div>
    </div>
  );
}