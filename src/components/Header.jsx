import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false); 
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header-container">
      <nav className="nav">
        <div className="logo">
          
            <h1>Countdown Board</h1>
          
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className={`nav-links ${menuOpen ? 'nav-links-mobile' : ''}`}>
          <ul>
            
            {/* <li><Link to="/about">ABOUT</Link></li> */}
           <li><Link to="/contact">CONTACT</Link></li>
           <li><Link to="/login-section">Sign Out</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
