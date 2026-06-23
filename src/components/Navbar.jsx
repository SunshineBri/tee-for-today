import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-black/60 backdrop-blur-md w-full">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* ---------- Logo + Wordmark ---------- */}
        <a
          href="#hero"
          className="flex items-center gap-8 w-auto h-12 select-none"
        >
          <img
            src="Logo.png"
            alt="Tee For Today Logo"
            className="h-full object-contain scale-x-150"
          />
          {/* word‑mark — tweak text size / weight / color as you like */}
          <span className="text-xl font-bold text-white tracking-wide">
              One tee. One cause. Every day.
          </span>
        </a>

        {/* ---------- Desktop Links ---------- */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          <a href="#hero" className="hover:text-purple-400 transition">
            Home
          </a>
          <a href="#charity" className="hover:text-purple-400 transition">
            Charity
          </a>
          <a href="#how-it-works" className="hover:text-purple-400 transition">
            How&nbsp;It&nbsp;Works
          </a>
        </div>

        {/* ---------- Mobile menu button ---------- */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* ---------- Mobile dropdown ---------- */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md px-6 py-4 space-y-4 text-white font-medium">
          <a
            href="#hero"
            onClick={() => setIsOpen(false)}
            className="block hover:text-purple-400 transition"
          >
            Home
          </a>
          <a
            href="#charity"
            onClick={() => setIsOpen(false)}
            className="block hover:text-purple-400 transition"
          >
            Charity
          </a>
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block hover:text-purple-400 transition"
          >
            How&nbsp;It&nbsp;Works
          </a>
        </div>
      )}
    </nav>
  );
}
