"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-white via-amber-50 to-white border-b-2 border-[var(--accent)] py-4 px-4 sm:py-6 sm:px-8 sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[var(--accent)] to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xl sm:text-2xl font-bold">🐕</span>
          </div>
          <Link href="/" className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] tracking-tight hover:text-[var(--accent)] transition-all duration-300 hover:scale-105">
            GoldiPuppy
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/puppies" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            Puppies for Sale
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/breeds" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            Dog Breeds
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/ordering" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            Easy Ordering
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/delivery" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            Delivery
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/faq" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/reviews" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            Reviews
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/blog" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="relative text-gray-700 hover:text-[var(--accent)] transition-all duration-300 font-semibold group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)] transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden flex flex-col space-y-1 p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 touch-manipulation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`w-6 h-0.5 bg-[var(--accent)] rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[var(--accent)] rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[var(--accent)] rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="pt-4 pb-2 space-y-1">
          <Link 
            href="/puppies" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🐕 Puppies for Sale
          </Link>
          <Link 
            href="/breeds" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🐕‍🦺 Dog Breeds
          </Link>
          <Link 
            href="/ordering" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            📋 Easy Ordering
          </Link>
          <Link 
            href="/delivery" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🚚 Delivery
          </Link>
          <Link 
            href="/faq" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ❓ FAQ
          </Link>
          <Link 
            href="/reviews" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ⭐ Reviews
          </Link>
          <Link 
            href="/blog" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            📝 Blog
          </Link>
          <Link 
            href="/contact" 
            className="block px-4 py-3 text-gray-700 hover:text-[var(--accent)] hover:bg-gray-50 rounded-lg transition-all duration-300 font-semibold touch-manipulation"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            📞 Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
