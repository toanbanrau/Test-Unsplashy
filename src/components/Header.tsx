"use client";

import type React from "react";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../assets/styles/header.css";

const Header = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?query=${encodeURIComponent(searchQuery)}`);
    }
  };

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
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href={"/"}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              version="1.1"
              aria-labelledby="accueil-unsplash"
              aria-hidden="false"
            >
              <desc lang="en-US">Unsplash logo</desc>
              <title id="accueil-unsplash">Accueil Unsplash</title>
              <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
            </svg>
          </Link>
        </div>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher de photos et illustrations"
            />
          </form>
        </div>
        <div className="user-actions">
          <a href="#" className="subscribe">
            Abonnez-vous à Unsplash+
          </a>
          <a href="#" className="submit">
            Envoyer une image
          </a>
          <span className="icon bell">🔔</span>
          <span className="icon user">👤</span>
          <span className="icon menu">☰</span>
        </div>
      </div>
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
    </header>
  );
};

export default Header;
