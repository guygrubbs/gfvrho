import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from './Header.module.scss';

/**
 * Header Component
 * Provides navigation and authentication controls for the application.
 */
const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    /**
     * Toggle Mobile Menu
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prevState) => !prevState);
    };

    /**
     * Handle User Logout
     */
    const handleLogout = () => {
        logout();
    };

    return (
        <header className={styles.header}>
            {/* Logo */}
            <Link to="/" className={styles.header__logo}>
                MyApp
            </Link>

            {/* Navigation for Larger Screens */}
            <nav className={styles.header__nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.header__navItem} ${styles['header__navItem--active']}`
                            : styles.header__navItem
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/features"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.header__navItem} ${styles['header__navItem--active']}`
                            : styles.header__navItem
                    }
                >
                    Features
                </NavLink>
                {user ? (
                    <>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.header__navItem} ${styles['header__navItem--active']}`
                                    : styles.header__navItem
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/viewer"
                            className={({ isActive }) =>
                                isActive
                                    ? `${styles.header__navItem} ${styles['header__navItem--active']}`
                                    : styles.header__navItem
                            }
                        >
                            Viewer
                        </NavLink>
                        <button onClick={handleLogout} className={styles.header__cta}>
                            Logout
                        </button>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive
                                ? `${styles.header__navItem} ${styles['header__navItem--active']}`
                                : styles.header__navItem
                        }
                    >
                        Login
                    </NavLink>
                )}
            </nav>

            {/* Mobile Menu Toggle */}
            <div className={styles.header__mobileMenu} onClick={toggleMobileMenu}>
                <span className={styles.header__mobileIcon}>&#9776;</span>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div
                    className={`${styles.header__dropdown} ${
                        isMobileMenuOpen ? styles['header__dropdown--active'] : ''
                    }`}
                >
                    <NavLink
                        to="/"
                        className={styles.header__dropdownItem}
                        onClick={toggleMobileMenu}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/features"
                        className={styles.header__dropdownItem}
                        onClick={toggleMobileMenu}
                    >
                        Features
                    </NavLink>
                    {user ? (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={styles.header__dropdownItem}
                                onClick={toggleMobileMenu}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink
                                to="/viewer"
                                className={styles.header__dropdownItem}
                                onClick={toggleMobileMenu}
                            >
                                Viewer
                            </NavLink>
                            <button onClick={handleLogout} className={styles.header__dropdownItem}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className={styles.header__dropdownItem}
                            onClick={toggleMobileMenu}
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
