import React from 'react';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo">
          <h1>☕ Coffee R Us Admin</h1>
          <p className="tagline">Administrator Portal</p>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;