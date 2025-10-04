import React, { useState } from "react";
import {
  FaPenNib,
  FaPaste,
  FaUpload,
  FaRegCalendarAlt,
  FaChartBar,
  FaRegLightbulb,
} from "react-icons/fa";
import styles from "../styles/sidebar.module.css";
import { cn } from "../utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

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

  const segments = [
    { name: "Create", icon: <FaPenNib /> },
    { name: "Templates", icon: <FaPaste /> },
    { name: "Publish", icon: <FaUpload /> },
    { name: "Planning", icon: <FaRegCalendarAlt /> },
    { name: "Analytics", icon: <FaChartBar /> },
    { name: "Summary", icon: <FaRegLightbulb /> },
  ];

  const handleClick = (name: string) => {
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