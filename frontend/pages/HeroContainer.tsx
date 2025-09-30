import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import HeroSection2 from "./HeroSection2";
import HeroSection3 from "./HeroSection3";
import styles from "../styles/HeroContainer.module.css";

// Load HeroSection1 only on client
const HeroSection1 = dynamic(() => import("./HeroSection1"), { ssr: false });

export default function HeroContainer() {
  const slides = [
    <HeroSection1 key={0} />,
    <HeroSection2 key={1} />,
    <HeroSection3 key={2} />,
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8s per slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.heroContainer}>
      {slides.map((Slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${currentSlide === index ? styles.active : ""}`}
        >
          {Slide}
        </div>
      ))}

      <div className={styles.dotsNav}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={currentSlide === index ? styles.activeDot : styles.dot}
            onClick={() => setCurrentSlide(index)}
          >
            {currentSlide === index ? "●" : "○"}
          </span>
        ))}
      </div>
    </div>
  );
}
