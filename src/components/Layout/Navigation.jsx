import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const navItems = [
    { path: '/', label: '🏠 Home', end: true },
    { path: '/products', label: '📦 Products' },
    { path: '/add-product', label: '➕ Add Product' }
  ];

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        {navItems.map(item => (
          <li key={item.path} className="nav-item">
            <NavLink 
              to={item.path} 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              end={item.end}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;