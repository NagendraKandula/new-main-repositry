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

interface SidebarProps {
  activeSegment: string;
  setActiveSegment: (segment: string) => void;
  activePlatform: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSegment, setActiveSegment, activePlatform }) => {
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
  };

  // ✅ REMOVED: if (activePlatform) return null; — Sidebar now always visible

  return (
    <>
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <nav className={styles.radialSegments}>
          {segments.map((s) => (
            <button
              key={s.name}
              className={`${styles.segment} ${activeSegment === s.name ? styles.active : ""}`}
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