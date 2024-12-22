import React from 'react';
import Button from './Button/Button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex items-center space-x-2">
          {/* Replace with your own logo/image as needed */}
          <div className="w-8 h-8 bg-emerald-500 rounded-full" />
          <span className="text-xl font-bold" style={{ fontFamily: 'Poppins' }}>
            gfvrho
          </span>
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex items-center space-x-6 text-sm" style={{ fontFamily: 'Open Sans' }}>
          <li>
            <a 
              href="#home" 
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              How It Works
            </a>
          </li>
          <li>
            <a 
              href="#submit-pitch-deck" 
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Submit Pitch Deck
            </a>
          </li>
          <li>
            <a 
              href="#resources-reports" 
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Resources &amp; Reports
            </a>
          </li>
          <li>
            <a 
              href="#about-us" 
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              About Us
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="text-gray-700 hover:text-emerald-600 transition-colors"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button variant="primary" onClick={() => console.log('Submit Pitch')}>
            Submit Pitch
          </Button>
        </div>

        {/* Hamburger Menu (for mobile) - optional */}
        <div className="md:hidden">
          <button 
            type="button" 
            className="text-gray-700 hover:text-emerald-600 transition-colors focus:outline-none"
          >
            {/* Icon placeholder, you can replace with a proper icon component */}
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
