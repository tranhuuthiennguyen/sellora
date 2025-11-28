import { useAuth } from "@/contexts/AuthContext";
import { Link } from "@tanstack/react-router";

export default function Header() {
  const { accessToken } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white tracking-tight">
      <div className="flex items-center justify-between border border-black border-solid">
        {/* Left: Logo + Github Badge */}
        <div className="flex items-center pl-4">
          <Link to="/" className="text-3xl font-bold tracking-wide">
            SELLORA
          </Link>
        </div>

        {/* Right side actions */}
        <div className="flex items-center">
          <nav className="hidden md:flex items-center gap-6 px-4">
            <a href="#" className="hover:text-pink-300">
              Discover
            </a>
            <a href="#" className="hover:text-pink-300">
              Blog
            </a>
            <a href="#" className="hover:text-pink-300">
              Pricing
            </a>
            <a href="#" className="hover:text-pink-300">
              Features
            </a>

            {/* Selected (About) */}
            <a
              href="#"
              className="px-2.5 py-1 rounded-full transition-colors duration-200
                   hover:bg-lavender-rose bg-white text-black"
            >
              About
            </a>
          </nav>
          {!accessToken ? (
            <>
              <Link
                to="/login"
                className="p-4 transition-colors duration-200 hover:bg-white hover:text-black border-l border-neutral-500"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="p-4 bg-lavender-rose transition-colors duration-200 hover:bg-white text-black"
              >
                Start selling
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="p-4 bg-lavender-rose transition-colors duration-200 hover:bg-white text-black"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
