import Link from "next/link";
import "../assets/styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href={"/"}>
            <svg
              className="FrJfL"
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
          <form action="/">
            <input
              type="text"
              name="query"
              defaultValue=""
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
      <nav className="category-nav">
        <ul>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
