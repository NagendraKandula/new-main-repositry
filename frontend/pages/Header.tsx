import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPinterest, FaLinkedin } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>☐ LOGO</div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <Link href="#">Features</Link>

          {/* Dropdown */}
          <div className={styles.dropdown}>
            <button
              className={styles.dropbtn}
              onClick={() => setIsOpen(!isOpen)}
              aria-haspopup="true"
              aria-expanded={isOpen}
            >
              Channels ▼
            </button>

            <div className={`${styles.dropdownContent} ${isOpen ? styles.show : ""}`}>
              <div className={styles.grid}>
                <Link href="#"><FaFacebook /> Facebook</Link>
                <Link href="#"><FaInstagram /> Instagram</Link>
                <Link href="#"><FaYoutube /> YouTube</Link>
                <Link href="#"><FaTwitter /> Twitter</Link>
                <Link href="#"><FaPinterest /> Pinterest</Link>
                <Link href="#"><FaLinkedin /> LinkedIn</Link>
                <Link href="#"><SiThreads /> Threads</Link>
              </div>
            </div>
          </div>

          <Link href="#">Blog</Link>
          <Link href="#">FAQs</Link>
        </nav>

        {/* Auth buttons */}
        <div className={styles.actions}>
          <Link href="/login" className={styles.loginButton}>Log In</Link>
          <Link href="/register" className={styles.getStartedButton}>Get Started</Link>
        </div>
      </div>
    </header>
  );
}
