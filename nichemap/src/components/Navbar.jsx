// Navbar.js

import React from 'react';
import './style/Navbar.css'; // Create a separate CSS file for styling if needed
import logoImage from './logo.png';

const Navbar = () => {
  
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoImage} alt='logo' />
      </div>
      <div className="right-sections">
        <div className="nav-item">Find Your Next Home!</div>
        <div className="nav-item">Contact</div>
      </div>
    </div>
  );
};

export default Navbar;
