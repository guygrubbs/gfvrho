import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#003366] text-white py-10 mt-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo / Branding */}
        <div>
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: 'Poppins' }}
          >
            gfvrho
          </h2>
          <p
            className="text-sm"
            style={{ fontFamily: 'Open Sans' }}
          >
            Empowering startups &amp; venture capitalists with data-driven insights
            for better investment decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            className="font-semibold mb-4"
            style={{ fontFamily: 'Poppins' }}
          >
            Quick Links
          </h3>
          <ul
            className="space-y-2 text-sm"
            style={{ fontFamily: 'Open Sans' }}
          >
            <li>
              <Link
                to="/"
                className="hover:text-[#00A676] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/submit-pitch"
                className="hover:text-[#00A676] transition-colors"
              >
                Submit Pitch Deck
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="hover:text-[#00A676] transition-colors"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-[#00A676] transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3
            className="font-semibold mb-4"
            style={{ fontFamily: 'Poppins' }}
          >
            Follow Us
          </h3>
          <div
            className="flex space-x-4 items-center"
            style={{ fontFamily: 'Open Sans' }}
          >
            {/* Replace these placeholders with real social icons or library icons */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00A676] transition-colors"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.164-2.724..." />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00A676] transition-colors"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 ..." />
              </svg>
            </a>
            {/* Add more icons as needed */}
          </div>
        </div>

        {/* Contact & Legal */}
        <div>
          <h3
            className="font-semibold mb-4"
            style={{ fontFamily: 'Poppins' }}
          >
            Contact &amp; Legal
          </h3>
          <div className="text-sm" style={{ fontFamily: 'Open Sans' }}>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p className="mb-4">Email: info@gfvrho.com</p>
            <p className="mb-1">123 Investment Way</p>
            <p className="mb-4">New York, NY 10001</p>
            <Link
              to="/privacy"
              className="block hover:text-[#00A676] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="block hover:text-[#00A676] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div
        className="text-center mt-8"
        style={{ fontFamily: 'Open Sans' }}
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} gfvrho. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
