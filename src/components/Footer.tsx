// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-600 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:underline">
            Explore
          </a>
          <a href="#" className="hover:underline">
            Advertise
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
          <a href="#" className="hover:underline">
            API
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
        </div>
        <p className="text-center md:text-right">
          © {new Date().getFullYear()} Unsplash Clone by You.
        </p>
      </div>
    </footer>
  );
}
