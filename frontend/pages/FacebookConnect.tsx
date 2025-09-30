import React from "react";
import styles from "../styles/FacebookConnect.module.css";
import { FaFacebookF } from "react-icons/fa";

const FacebookConnect = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FaFacebookF className={styles.facebookIcon} />
          <h1>Connect Your Facebook Account</h1>
          <p className={styles.subtitle}>
            Manage Pages, schedule posts, and track engagement — all from one powerful dashboard.
          </p>
        </div>

        <div className={styles.benefits}>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>📘</div>
            <div>
              <h3>Schedule Posts to Pages & Groups</h3>
              <p>Plan content weeks ahead and auto-publish at optimal times.</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>📊</div>
            <div>
              <h3>Track Likes, Shares & Comments</h3>
              <p>Understand what content resonates with your audience and grow faster.</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <div className={styles.benefitIcon}>🤖</div>
            <div>
              <h3>AI Caption & Hashtag Suggestions</h3>
              <p>Save time and boost reach with smart, tailored content ideas.</p>
            </div>
          </div>
        </div>

        <div className={styles.trustSection}>
          <p>🔒 Secure connection via Facebook’s official Graph API</p>
          <p>🚫 We never post without your explicit approval</p>
        </div>

        <button className={styles.connectButton}>
          <FaFacebookF />
          Connect to Facebook
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

export default FacebookConnect;