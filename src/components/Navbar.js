// src/components/Navbar.js
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar({ title, theme, themeName, changeTheme, themes }) {
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowThemeDropdown(false);
      }
    };

    if (showThemeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeDropdown]);

  const navbarStyle = {
    backgroundColor: theme.background,
    borderBottom: `1px solid ${theme.border}`,
    transition: 'all 0.3s ease'
  };

  const linkStyle = {
    color: theme.text,
    transition: 'color 0.3s ease'
  };

  const brandStyle = {
    color: theme.accent,
    fontWeight: 'bold',
    transition: 'color 0.3s ease'
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyle}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/" style={brandStyle}>
          <Logo size={32} theme={theme} />
          <span style={{ marginLeft: '10px', fontSize: '1.25rem' }}>{title}</span>
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent"
          style={{ borderColor: theme.border }}
        >
          <span className="navbar-toggler-icon" style={{ filter: theme.mode === 'dark' ? 'invert(1)' : 'none' }} />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/" 
                end
                style={({ isActive }) => ({
                  ...linkStyle,
                  color: isActive ? theme.accent : theme.text,
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/about"
                style={({ isActive }) => ({
                  ...linkStyle,
                  color: isActive ? theme.accent : theme.text,
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                About
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <div className="dropdown" style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                className="btn btn-outline-secondary dropdown-toggle"
                type="button"
                id="themeDropdown"
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                style={{
                  borderColor: theme.border,
                  color: theme.text,
                  backgroundColor: theme.surface,
                  transition: 'all 0.3s ease'
                }}
              >
                🎨 {themes[themeName]?.name || 'Theme'}
              </button>
              {showThemeDropdown && (
                <div
                  className="dropdown-menu show"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                    minWidth: '200px',
                    position: 'absolute',
                    right: 0,
                    left: 'auto',
                    marginTop: '5px',
                    zIndex: 1000
                  }}
                >
                  {Object.keys(themes).map((key) => (
                    <button
                      key={key}
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        changeTheme(key);
                        setShowThemeDropdown(false);
                      }}
                      style={{
                        color: theme.text,
                        backgroundColor: key === themeName ? theme.accent + '30' : 'transparent',
                        padding: '8px 16px',
                        border: 'none',
                        width: '100%',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (key !== themeName) e.target.style.backgroundColor = theme.accent + '20';
                      }}
                      onMouseLeave={(e) => {
                        if (key !== themeName) e.target.style.backgroundColor = key === themeName ? theme.accent + '30' : 'transparent';
                      }}
                    >
                      {themes[key].name}
                      {key === themeName && ' ✓'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.object,
  themeName: PropTypes.string,
  changeTheme: PropTypes.func,
  themes: PropTypes.object,
};

Navbar.defaultProps = {
  title: "Set title here",
};
