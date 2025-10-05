import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

// Local icon imports
import threadsIcon from "/public/threads.png";
import twitterIcon from "/public/twitter.png";
import pinterestIcon from "/public/pinterest.png";

interface Platform {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

// Custom Threads Icon Component
const ThreadsIcon = ({ className }: { className?: string }) => (
  <Image src={threadsIcon} alt="Threads" width={22} height={22} className={`${className} object-contain`} />
);

// Custom Twitter/X Icon Component
const TwitterIcon = ({ className }: { className?: string }) => (
  <Image src={twitterIcon} alt="Twitter/X" width={22} height={22} className={`${className} object-contain`} />
);

// Custom Pinterest Icon Component
const PinterestIcon = ({ className }: { className?: string }) => (
  <Image src={pinterestIcon} alt="Pinterest" width={22} height={22} className={`${className} object-contain`} />
);

const platforms: Platform[] = [
  { id: "twitter", name: "Twitter", icon: <TwitterIcon className="h-[22px] w-[22px]" />, color: "bg-black" },
  { id: "facebook", name: "Facebook", icon: <Facebook className="h-[22px] w-[22px]" />, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: <Instagram className="h-[22px] w-[22px]" />, color: "bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500" },
  { id: "linkedin", name: "LinkedIn", icon: <Linkedin className="h-[22px] w-[22px]" />, color: "bg-blue-700" },
  { id: "threads", name: "Threads", icon: <ThreadsIcon className="h-[22px] w-[22px]" />, color: "bg-black dark:bg-white" },
  { id: "pinterest", name: "Pinterest", icon: <PinterestIcon className="h-[22px] w-[22px]" />, color: "bg-red-600" },
];

interface ChannelSelectorProps {
  selectedChannels: string[];
  onChannelToggle: (channelId: string) => void;
  onSelectAll: () => void;
}

export function ChannelSelector({ selectedChannels, onChannelToggle, onSelectAll }: ChannelSelectorProps) {
  const allSelected = selectedChannels.length === platforms.length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Channels</h3>

      <div className="flex gap-2 overflow-x-auto">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`p-2 rounded-lg cursor-pointer flex-shrink-0 transition-all duration-200 ${
              selectedChannels.includes(platform.id)
                ? "border-2 border-green-500 bg-green-50 dark:bg-green-950/20"
                : "border-2 border-transparent hover:border-green-300 hover:bg-green-50/50 dark:hover:bg-green-950/10"
            }`}
            onClick={() => onChannelToggle(platform.id)}
          >
            <div className={`p-2 rounded-lg ${platform.color} text-white flex items-center justify-center`}>
              {platform.icon}
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={onSelectAll} className="w-full">
        {allSelected ? "Deselect All" : "Select All"}
      </Button>
    </div>
  );
}
