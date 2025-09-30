// components/MainContent.tsx
import React from "react";
import Link from "next/link";
import styles from "../styles/MainContent.module.css";

export default function MainContent() {
  return (
    <div className={styles.mainContent}>
      <div className={styles.contentWrapper}>
        {/* Social Proof Tagline */}
        <div className={styles.tag}>
          ✨ Trusted by creators across Instagram, YouTube, LinkedIn & more
        </div>

        {/* Hero Headline */}
        <h1 className={styles.headline}>
        All Your Content, One Smart Hub.
        </h1>

        {/* Subheadline */}
        <p className={styles.subheadline}>
          Create once, publish everywhere. <br />
          Plan, schedule, and track your content without the chaos.
        </p>

        {/* Feature Badges */}
        <div className={styles.badges}>
          <span className={styles.badge}>📱 Manage all platforms</span>
          <span className={styles.badge}>⚡ Start in 30 seconds</span>
          <span className={styles.badge}>🆓 Free to get started</span>
        </div>

        {/* CTA */}
        <Link href="/register" className={styles.ctaButton}>
          Get Started →
        </Link>

        {/* Social Proof */}
        <p className={styles.socialProof}>
          Join 12,000+ creators saving hours every week with smarter posting.
        </p>
      </div>
    </div>
  );
}
