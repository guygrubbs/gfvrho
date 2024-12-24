// Footer.jsx

import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Provides site-wide footer navigation, social media links, and copyright notice.
 */
const Footer = () => {
    return (
        <footer className={styles.footer}>
            {/* Navigation Links */}
            <nav className={styles.footer__nav}>
                <Link to="/" className={styles.footer__navItem}>Home</Link>
                <Link to="/features" className={styles.footer__navItem}>Features</Link>
                <Link to="/about" className={styles.footer__navItem}>About Us</Link>
                <Link to="/contact" className={styles.footer__navItem}>Contact</Link>
            </nav>

            {/* Divider Line */}
            <div className={styles.footer__divider}></div>

            {/* Social Media Links */}
            <div className={styles.footer__social}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                    <i className="fab fa-instagram"></i>
                </a>
            </div>

            {/* Divider Line */}
            <div className={styles.footer__divider}></div>

            {/* Footer Text */}
            <p className={styles.footer__text}>
                &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
