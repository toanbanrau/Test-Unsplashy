import React from "react";
import "../assets/styles/banner.css";
const Banner = () => {
  return (
    <div className="container-banner">
      {/* Promotional Section */}
      <div className="promo-section">
        <div className="promo-image">
          <div className="shape1" />
          <div className="shape2" />
          <div className="shape3" />
          <div className="shape4" />
        </div>
        <div className="promo-text">
          <h1>Accédez à tout ce quUnsplash+ propose.</h1>
          <p>Annulez à tout moment.</p>
          <button>Passez à Unsplash+</button>
        </div>
      </div>
  
      <div className="sidebar">
        <div className="collections">
          <h2>Collections</h2>
          <div className="collection-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1674940594598-98e9e13f99f5?w=40&dpr=2&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Mother Earth"
            />
            <div>
              <p>Mother Earth</p>
              <p>70 images</p>
            </div>
          </div>
          <div className="collection-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1692731879876-321a62e45260?w=40&dpr=2&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Colorful Interiors & Exteriors"
            />
            <div>
              <p>Colorful Interiors &amp; Exteriors</p>
              <p>85 images</p>
            </div>
          </div>
          <div className="collection-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1736765199626-6a0929ec737d?w=40&dpr=2&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Golden Hours"
            />
            <div>
              <p>Golden Hours</p>
              <p>31 images</p>
            </div>
          </div>
          <div className="collection-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1678116083971-d578dcb0e590?w=40&dpr=2&h=40&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Spring Awakening"
            />
            <div>
              <p>Spring Awakening</p>
              <p>45 images</p>
            </div>
          </div>
          <a href="#">Afficher les recherches les plus populaires</a>
        </div>
        <div className="buttons">
          <button>Amérique</button>
          <button>Andorre</button>
          <button>Blond</button>
          <button>Baisse Des Actions</button>
          <button>Ukraine</button>
          <button>Joyeuses Pâques</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
