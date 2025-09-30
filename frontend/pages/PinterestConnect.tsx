import React from "react";
import styles from "../styles/PinterestConnect.module.css";
import { FaPinterestP } from "react-icons/fa";

const PinterestConnect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FaPinterestP className={styles.pinterestIcon} />
          <h1>Connect Your Pinterest Account</h1>
          <p className={styles.subtitle}>
            Schedule pins, grow your audience, and drive traffic — all from one beautiful dashboard.
          </p>
        </div>

        <div className={styles.benefits}>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>📌</div>
            <div>
              <h3>Schedule Pins in Advance</h3>
              <p>Plan your visual content calendar and auto-publish to multiple boards.</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>🎨</div>
            <div>
              <h3>Track Saves & Clicks</h3>
              <p>See which pins drive traffic and engagement — optimize your best content.</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>✨</div>
            <div>
              <h3>AI Pin Description Generator</h3>
              <p>Create compelling, SEO-friendly descriptions that get your pins discovered.</p>
            </div>
          </div>
        </div>

        <div className={styles.trustSection}>
          <p>🔒 Secure connection via Pinterest’s official API</p>
          <p>🚫 We never pin without your approval</p>
        </div>

        <button className={styles.connectButton}>
          <FaPinterestP />
          Connect to Pinterest
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

export default PinterestConnect;