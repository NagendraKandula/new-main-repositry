import React from "react";
import styles from "../styles/HeroSection1.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faThreads, faFacebook, faTwitter, faLinkedin, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function HeroSection1() {
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
        <source src="/Himg1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground content */}
      <div className={styles.homeContent}>
        <h1>Explore Fearlessly. Post Effortlessly</h1>
        <p>Powerful social media management for explorers, creators & storytellers.</p>
        <button
          className={styles.ctaButton}
          onClick={() => router.push("/login")}
        >
        Start Now
        </button>
        <div className={styles.socialIconsBubbles}>
        <div className={styles.iconBubble} style={{ backgroundColor: '#E1306C' }}><FontAwesomeIcon icon={faInstagram} /></div>
        <div className={styles.iconBubble} style={{ backgroundColor: '#000000' }}><FontAwesomeIcon icon={faThreads} /></div>
        <div className={styles.iconBubble} style={{ backgroundColor: '#1877F2' }}><FontAwesomeIcon icon={faFacebook} /></div>
        <div className={styles.iconBubble} style={{ backgroundColor: '#1DA1F2' }}><FontAwesomeIcon icon={faTwitter} /></div>
        <div className={styles.iconBubble} style={{ backgroundColor: '#0A66C2' }}><FontAwesomeIcon icon={faLinkedin} /></div>
        <div className={styles.iconBubble} style={{ backgroundColor: '#E60023' }}><FontAwesomeIcon icon={faPinterest} /></div>
        <div className={styles.iconBubble} style={{ backgroundColor: '#FF0000' }}><FontAwesomeIcon icon={faYoutube} /></div>
       </div>
      </div>
    </section>
  );
}
