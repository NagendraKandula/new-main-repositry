import React from "react";
import styles from "../styles/InstagramConnect.module.css";
import { FaInstagram } from "react-icons/fa";

const InstagramConnect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FaInstagram className={styles.instagramIcon} />
          <h1>Connect Your Instagram</h1>
          <p className={styles.subtitle}>
            Unlock scheduling, analytics, and AI-powered tools to grow your presence.
          </p>
        </div>

        <div className={styles.benefits}>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>📅</div>
            <div>
              <h3>Schedule Posts</h3>
              <p>Plan your content calendar weeks in advance.</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>📊</div>
            <div>
              <h3>Track Performance</h3>
              <p>See which posts drive the most engagement and growth.</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>✨</div>
            <div>
              <h3>AI Caption & Hashtag Generator</h3>
              <p>Never struggle with captions again. Let AI help!</p>
            </div>
          </div>
        </div>

        <div className={styles.trustSection}>
          <p>🔒 Secure connection via Instagram’s official API</p>
          <p>🚫 We never post without your explicit approval</p>
        </div>

        <button className={styles.connectButton}>
          <FaInstagram />
          Connect to Instagram
        </button>

        <div className={styles.footerNote}>
          <p>
            By connecting, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstagramConnect;