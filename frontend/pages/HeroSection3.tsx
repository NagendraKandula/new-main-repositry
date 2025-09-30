import React from "react";
import styles from "../styles/HeroSection3.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faThreads, faFacebook, faTwitter, faLinkedin, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons';


export default function HeroSection3() {
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
        <source src="/Himg4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground content */}
      <div className={styles.homeContent}>
        <h1>Zero stress. Max vibes. That’s the promise.</h1>
        <p>Algorithm? We’ve got a crush on it. It likes you back.</p>
        <button
          className={styles.ctaButton}
          onClick={() => router.push("/login")}
        >
          Start Sharing
        </button>
       <div className={styles.simpleIcons}>
      <div className={styles.simpleIcon}>
        <FontAwesomeIcon icon={faInstagram} />
      </div>
      <div className={styles.simpleIcon}>
        <FontAwesomeIcon icon={faThreads} />
      </div>
      <div className={styles.simpleIcon}>
        <FontAwesomeIcon icon={faYoutube} />
      </div>
      <div className={styles.simpleIcon}>
        <FontAwesomeIcon icon={faTwitter} />
      </div>
      <div className={styles.simpleIcon}>
        <FontAwesomeIcon icon={faLinkedin} />
      </div>
      <div className={styles.simpleIcon}>
        <FontAwesomeIcon icon={faPinterest} />
      </div>
      <div className={styles.simpleIcon}>
        <FontAwesomeIcon icon={faFacebook} />
      </div>
    </div>
</div>
    </section>
  );
}
