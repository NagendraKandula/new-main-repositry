import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaPinterest, FaYoutube } from "react-icons/fa";
import styles from "../styles/connect.module.css";

const ConnectPage = () => {
  // State to track if YouTube is connected
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);

  // Why is this needed?
  // We use useEffect to check for the YouTube access token cookie when the component
  // first loads. This allows us to show "Connected" if the user has already
  // authenticated, providing immediate feedback without requiring a button click.
  useEffect(() => {
    // A simple way to check if a cookie exists
    if (document.cookie.includes('youtube_access_token=')) {
      setIsYouTubeConnected(true);
    }
  }, []); // The empty dependency array ensures this runs only once on mount

  const platforms = [
    {
      name: "Instagram",
      connected: false,
      icon: <FaInstagram className={styles.icon}/>,
      url: "https://www.instagram.com/accounts/login/",
    },
    {
      name: "Facebook",
      connected: false,
      icon: <FaFacebook className={styles.icon} />,
      url: "https://www.facebook.com/login/",
    },
    {
      name: "LinkedIn",
      connected: false,
      icon: <FaLinkedin className={styles.icon} />,
      url: "https://www.linkedin.com/login/",
    },
    {
      name: "Twitter",
      connected: false,
      icon: <FaTwitter className={styles.icon} />,
      url: "https://twitter.com/login/",
    },
    {
      name: "Pinterest",
      connected: false,
      icon: <FaPinterest className={styles.icon} />,
      url: "https://www.pinterest.com/login/",
    },
    {
      name: "YouTube",
      connected: true,
      icon: <FaYoutube className={styles.icon} />,
      url: "http://localhost:4000/auth/youtube",
    },
  ];

  const handleConnect = (url: string, platformName: string) => {
    if (platformName === "YouTube") {
      // --- CHANGE 2: Redirect the current page for the OAuth flow ---
      window.location.href = url;
    } else {
      // Keep the old behavior for other platforms for now
      window.open(url, "_blank");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>☐ LOGO</h1>
        <h2 className={styles.subheading}>Connect your social media in seconds</h2>
        <p className={styles.subsubheading}>
          From posting to publish, AI content to analytics — everything starts with a connection.
        </p>

        <div className={styles.platformList}>
          {platforms.map((platform) => (
            <div key={platform.name} className={styles.platformCard}>
              <div className={styles.platformInfo}>
                {platform.icon}
                <span className={styles.platformName}>{platform.name}</span>
              </div>
              <button
                className={`${styles.button} ${
                  platform.connected ? styles.connected : styles.connect
                }`}
                // --- CHANGE 3: Pass platform name to handler ---
                onClick={() => !platform.connected && handleConnect(platform.url, platform.name)}
                // Disable button if connected
                disabled={platform.connected}
              >
                {platform.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
        <div className={styles.skipContainer}>
          <button
            className={styles.skipButton}
            onClick={() => {
          localStorage.setItem('socialConnectSkipped', 'true'); // Optional: remember they skipped
           window.location.href = "/Landing"; // Redirect to Landing Page
    }}
  >
    Skip
    </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;