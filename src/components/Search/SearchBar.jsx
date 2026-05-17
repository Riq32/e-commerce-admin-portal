import React, { useRef, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder = "Search products..." }) => {
  const inputRef = useRef(null);

  // Optional: Add keyboard shortcut (Ctrl+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className="search-clear"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <div className="search-hint">
        <span className="hint-text">Press Ctrl + K to focus search</span>
      </div>
    </div>
  );
};

export default SearchBar;