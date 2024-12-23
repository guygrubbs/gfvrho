// frontend/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className="bg-navy-800 text-white py-6 mt-12">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/" className="hover:text-emerald-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-emerald-400">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/features" className="hover:text-emerald-400">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" className="hover:text-emerald-400">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-emerald-400">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-emerald-400"
                            >
                                Twitter
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-emerald-400"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Legal Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Legal</h4>
                    <ul className="space-y-1">
                        <li>
                            <Link to="/privacy-policy" className="hover:text-emerald-400">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms-of-service" className="hover:text-emerald-400">
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center mt-6 text-sm border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} GFVRHO. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
