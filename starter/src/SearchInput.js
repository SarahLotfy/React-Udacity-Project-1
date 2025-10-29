import React, { useState, useEffect } from 'react';
import './SearchInput.css';

const SearchInput = ({ onSearch, isLoading = false }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue === '') {
      onSearch('');
      return;
    }

    const timeoutId = setTimeout(() => {
      onSearch(inputValue);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, onSearch]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="search-input-container">
      <div className={`search-input-wrapper ${isLoading ? 'loading' : ''}`}>
        <div className="search-icon">
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        
        <input
          type="text"
          value={inputValue}
          placeholder="Search by title, author, or genre..."
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="search-input"
          autoFocus
          aria-label="Search books"
        />
        
        {inputValue && (
          <button 
            className="clear-button"
            onClick={handleClear}
            disabled={isLoading}
            aria-label="Clear search"
            title="Clear search (ESC)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;