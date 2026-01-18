'use client';

import Link from 'next/link';
import { Menu, X, Workflow, Home, Grid3x3 } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg blur-sm group-hover:blur-md transition-all duration-300 opacity-70" />
              <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 p-2 rounded-lg">
                <Workflow className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-2xl font-bold gradient-text font-display">
              AutoFlow Hub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span>Home</span>
            </Link>

            <Link
              href="/catalog"
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 group"
            >
              <Grid3x3 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span>Catalog</span>
            </Link>

            <Link
              href="/catalog"
              className="btn-primary"
            >
              Discover Workflows
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-200"
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all duration-200"
              >
                <Grid3x3 className="w-5 h-5" />
                <span className="font-medium">Catalog</span>
              </Link>

              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary mx-4"
              >
                Discover Workflows
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}