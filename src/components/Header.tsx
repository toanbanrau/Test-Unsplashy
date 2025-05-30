"use client";

import type React from "react";
import Link from "next/link";
import "../assets/styles/header.css";
import Category from "./Category";
import SearchInput from "./SeacrhInput";

const Header = () => {
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
          <SearchInput/>
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
      <Category />
    </header>
  );
};

export default Header;
