"use client";

import type React from "react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const Category = () => {
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const checkScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

    setShowLeftFade(scrollLeft > 0);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`category-nav-container ${showLeftFade ? "fade-left" : ""} ${
        showRightFade ? "fade-right" : ""
      }`}
    >
      <button
        className="scroll-button left"
        onClick={scrollLeft}
        style={{
          opacity: showLeftFade ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        &#8249;
      </button>

      <div className="category-nav">
        <ul ref={scrollContainerRef}>
          <li>
            <Link href="/" className="active">
              Photos
            </Link>
          </li>
          <li>
            <a href="#" className="active">
              Illustrations
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Unsplash+
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Wallpapers
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Nature
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Rendus 3D
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Textures
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Architecture Et Intérieur
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Voyager
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Film
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Photographie De Rue
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Gens
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Animaux
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Expérimental
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Mode &amp; Beauté
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Mode &amp; Beauté
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Mode &amp; Beauté
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Mode &amp; Beauté
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Mode &amp; Beauté
            </a>
          </li>
          <li>
            <a href="#" className="active">
              Mode &amp; Beauté
            </a>
          </li>
        </ul>
      </div>

      <button
        className="scroll-button right"
        onClick={scrollRight}
        style={{
          opacity: showRightFade ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Category;
