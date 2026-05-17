import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>&copy; {currentYear} Coffee R Us - Administrator Portal</p>
        <p className="footer-links">
          <span>📞 +254 748 464 235</span>
          <span>✉️ admin@coffeerus.com</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;