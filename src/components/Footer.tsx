import "../assets/styles/footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="#" className="footer-link">
            Explore
          </a>
          <a href="#" className="footer-link">
            Advertise
          </a>
          <a href="#" className="footer-link">
            Blog
          </a>
          <a href="#" className="footer-link">
            API
          </a>
          <a href="#" className="footer-link">
            Jobs
          </a>
          <a href="#" className="footer-link">
            Privacy
          </a>
          <a href="#" className="footer-link">
            Terms
          </a>
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} Unsplash Clone by You.
        </p>
      </div>
    </footer>
  );
}
