import React from 'react';
import { Twitter, Facebook, Instagram, Linkedin, MessageCircle, Youtube, Hash } from "lucide-react";
import { cn } from "../utils";
import styles from "./ChannelSelector.module.css";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const platforms: Platform[] = [
  { id: "twitter", name: "Twitter", icon: <Twitter className="h-5 w-5" />, color: "bg-black" },
  { id: "facebook", name: "Facebook", icon: <Facebook className="h-5 w-5" />, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: <Instagram className="h-5 w-5" />, color: "bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500" },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, color: "bg-blue-700" },
  { id: "youtube", name: "YouTube", icon: <Youtube className="h-5 w-5" />, color: "bg-red-600" },

];

interface ChannelSelectorProps {
  selectedChannels: string[];
  onChannelToggle: (channelId: string) => void;
}

export function ChannelSelector({ selectedChannels, onChannelToggle }: ChannelSelectorProps) {
  return (
    <div className={styles.platformIconList}>
      {platforms.map((platform) => (
        <div
          key={platform.id}
          className={cn(styles.platformIcon, platform.color, { [styles.selected]: selectedChannels.includes(platform.id) })}
          onClick={() => onChannelToggle(platform.id)}
        >
          {platform.icon}
        </div>
      ))}
    </div>
  );
}