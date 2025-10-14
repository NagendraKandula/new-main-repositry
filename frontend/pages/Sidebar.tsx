// frontend/pages/Sidebar.tsx
import React, { useState } from "react";
import { useRouter } from 'next/router'; // Import useRouter for navigation
import {
  FaPenNib,
  FaPaste,
  FaUpload,
  FaRegCalendarAlt,
  FaChartBar,
  FaRegLightbulb,
} from "react-icons/fa";
import styles from "../styles/sidebar.module.css";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "utils";

const TooltipProvider = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) => {
  return <TooltipPrimitive.Provider {...props} />;
};

const Tooltip = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) => {
  return <TooltipPrimitive.Root {...props} />;
};

const TooltipTrigger = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => {
  return <TooltipPrimitive.Trigger {...props} />;
};

const TooltipContent = ({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Content>) => {
  return <TooltipPrimitive.Content {...props} />;
};

interface SidebarProps {
  activeSegment: string;
  setActiveSegment: (segment: string) => void;
  activePlatform: string | null;
  // Add the new prop
  setActivePlatform: (platform: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSegment, setActiveSegment, activePlatform, setActivePlatform }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter(); // Initialize the router

  // Added a 'route' property to each segment for navigation
  const segments = [
    { name: "Create", icon: <FaPenNib />, route: "/Create" },
    { name: "Templates", icon: <FaPaste />, route: "/Templates" },
    { name: "Publish", icon: <FaUpload />, route: "/Publish" },
    { name: "Planning", icon: <FaRegCalendarAlt />, route: "/Planning" },
    { name: "Analytics", icon: <FaChartBar />, route: "/Analytics" },
    // This is the new segment for YouTube Analytics
    { name: "Summary", icon: <FaRegLightbulb />, route: "/Summary" },
  ];

  const handleClick = (name: string, route: string) => {
    setActiveSegment(name);
    // Add this line to reset the active platform
    setActivePlatform(null);
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <nav className={styles.radialSegments}>
          {segments.map((s) => (
            <button
              key={s.name}
              className={`${styles.segment} ${activeSegment === s.name && !activePlatform ? styles.active : ""}`}
              onClick={() => handleClick(s.name)}
              aria-label={s.name}
            >
              <span className={styles.segmentIcon}>{s.icon}</span>
              {!collapsed && <span className={styles.segmentTitle}>{s.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Floating Toggle Button — outside sidebar */}
      <button
        className={styles.sidebarToggle}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{ left: collapsed ? '60px' : '250px' }}
      >
        {collapsed ? '⟩' : '⟨'}
      </button>
    </>
  );
};

export default Sidebar;