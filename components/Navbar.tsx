"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo text-brand-blue">
          Webstack
        </Link>

        {/* Desktop nav */}
        <nav className="navbar-links" aria-label="Main navigation">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <Link href="/posts" className="btn-primary-green hidden-mobile">
          Get started
        </Link>

        {/* Hamburger */}
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={`bar ${menuOpen ? "open" : ""}`} />
          <span className={`bar ${menuOpen ? "open" : ""}`} />
          <span className={`bar ${menuOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          <Link href="/" className="mobile-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link href="/posts" className="btn-primary mobile-cta" onClick={() => setMenuOpen(false)}>
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
