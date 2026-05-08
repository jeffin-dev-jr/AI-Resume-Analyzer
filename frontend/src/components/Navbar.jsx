import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-sageBlue/70 dark:bg-ashBerry/70 border-b border-white/20 px-6 py-4 shadow-lg flex items-center justify-between">

      {/* Website Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/job_hats_logo_transparent.png"
          alt="Job Hats Logo"
          className="h-12 w-auto"
        />
      </Link>

      {/* NAV OPTIONS — SHOW ONLY WHEN NOT HOME */}
      {!isHome && (
        <div className="flex gap-4">
          <NavBtn to="/upload" label="Upload" />
          <NavBtn to="/jobs" label="Jobs" />
          <NavBtn to="/courses" label="Courses" />
          <NavBtn to="/analysis" label="Analysis" />
        </div>
      )}

      {/* SETTINGS MENU — ALWAYS VISIBLE */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="text-3xl font-bold text-ashBerry dark:text-sageBlue"
        >
          ☰
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg
                          bg-white text-gray-900
                          dark:bg-gray-800 dark:text-gray-100">

            <button className="w-full px-4 py-3 text-left hover:bg-sageBlue/40 dark:hover:bg-ashBerry/40">
              Login / Signin
            </button>

            <button
              onClick={toggleTheme}
              className="w-full px-4 py-3 text-left hover:bg-sageBlue/40 dark:hover:bg-ashBerry/40"
            >
              Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavBtn({ to, label }) {
  return (
    <Link
      to={to}
      className="px-4 py-1.5 rounded-xl
                 bg-white/70 text-ashBerry
                 dark:bg-gray-900/60 dark:text-sageBlue
                 hover:scale-105 transition shadow-sm"
    >
      {label}
    </Link>
  );
}