import React from 'react';
import SearchResults from './SearchResults';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';

const BookSearch = ({ 
  searchBooks, 
  myBooks, 
  searchQuery, 
  onSearch, 
  onResetSearch, 
  onMove,
  isSearching 
}) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search" onClick={onResetSearch}>
            Close
          </button>
        </Link>
        <SearchInput 
          searchQuery={searchQuery}
          onSearch={onSearch}
          isLoading={isSearching}
        />
      </div>
      <SearchResults
        searchBooks={searchBooks}
        myBooks={myBooks}
        onMove={onMove}
        isSearching={isSearching}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default BookSearch;