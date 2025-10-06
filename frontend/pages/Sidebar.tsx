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
  FaYoutube, // Import the YouTube icon
} from "react-icons/fa";
import styles from "../styles/sidebar.module.css";
import Link from "next/link";

interface SidebarProps {
  activeSegment: string;
  setActiveSegment: (segment: string) => void;
  activePlatform: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSegment, setActiveSegment, activePlatform }) => {
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
    { name: "YouTube Analytics", icon: <FaYoutube />, route: "/YoutubeAnalytics" },
    { name: "Summary", icon: <FaRegLightbulb />, route: "/Summary" },
  ];

  const handleClick = (name: string, route: string) => {
    setActiveSegment(name);
    router.push(route); // Navigate to the page when a button is clicked
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <nav className={styles.radialSegments}>
          {segments.map((s) => (
            <button
              key={s.name}
              className={`${styles.segment} ${activeSegment === s.name ? styles.active : ""}`}
              onClick={() => handleClick(s.name, s.route)}
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