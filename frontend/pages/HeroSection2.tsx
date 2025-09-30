import React from "react";
import styles from "../styles/HeroSection2.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faThreads, faFacebook, faTwitter, faLinkedin, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons';


export default function HeroSection2() {
  const router = useRouter();

  return (
    <section className={styles.mainContainer}>
      {/* Background video */}
      <video
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto" 
      >
        <source src="/Himg2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground content */}
      <div className={styles.homeContent}>
        <h1>For moms who want to be IN the memories</h1>
        <p>Schedule your posts while they’re napping. Engage while they’re snacking. Post while they’re playing. </p>
        <button
          className={styles.ctaButton}
          onClick={() => router.push("/login")}
        >
          Post Joy
        </button>
       <div className={styles.floatingIcons}>
  <div className={`${styles.iconWrapper} ${styles.instagram}`}>
    <FontAwesomeIcon icon={faInstagram} className={styles.platformIcon} />
    <div className={styles.floatingDot}>✨</div>
  </div>
  <div className={`${styles.iconWrapper} ${styles.tiktok}`}>
    <FontAwesomeIcon icon={faThreads} className={styles.platformIcon} />
  </div>
  <div className={`${styles.iconWrapper} ${styles.facebook}`}>
    <FontAwesomeIcon icon={faFacebook} className={styles.platformIcon} />
  </div>
  <div className={`${styles.iconWrapper} ${styles.twitter}`}>
    <FontAwesomeIcon icon={faTwitter} className={styles.platformIcon} />
  </div>
  <div className={`${styles.iconWrapper} ${styles.linkedin}`}>
    <FontAwesomeIcon icon={faLinkedin} className={styles.platformIcon} />
  </div>
  <div className={`${styles.iconWrapper} ${styles.pinterest}`}>
    <FontAwesomeIcon icon={faPinterest} className={styles.platformIcon} />
  </div>
  <div className={`${styles.iconWrapper} ${styles.youtube}`}>
    <FontAwesomeIcon icon={faYoutube} className={styles.platformIcon} />
    <div className={styles.floatingDot}>❤️</div>
</div>
</div>
      </div>
    </section>
  );
}
