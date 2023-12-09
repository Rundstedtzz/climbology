// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Header.css';
// import logoImage from '../assets/monkey.png';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo-link"> {/* Link wrapping both logo and text */}
        {/* <div className="logo"> */}
          {/* <img src={logoImage} alt="Emo AI Logo" className="logo-image" /> */}
          {/* <span className="logo-text">Emo AI</span> */}
        {/* </div> */}
      </Link>
      <nav>
        <ul>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/kilter">The Kilter Board</Link></li>
          <li><Link to="/team">Our Team</Link></li>
          <li><Link to="/signin">Sign in</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

