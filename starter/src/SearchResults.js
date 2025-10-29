import React from 'react';
import Book from './Book';

const SearchResults = ({ searchBooks, myBooks, onMove, isSearching, searchQuery }) => {
  const safeSearchBooks = Array.isArray(searchBooks) ? searchBooks : [];
  
  const updatedBooks = safeSearchBooks.map(book => {
    const bookInMyBooks = myBooks.find(myBook => myBook.id === book.id);
    
    return {
      ...book,
      shelf: bookInMyBooks ? bookInMyBooks.shelf : 'none',
      imageLinks: book.imageLinks || { thumbnail: '' },
      authors: book.authors || ['Unknown Author'],
      title: book.title || 'No Title Available',
      id: book.id
    };
  });

  if (isSearching) {
    return (
      <div className="search-books-results">
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching for "{searchQuery}"...</p>
        </div>
      </div>
    );
  }

  if (searchQuery && safeSearchBooks.length === 0) {
    return (
      <div className="search-books-results">
        <div className="no-results">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                  stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>No books found</h3>
          <p>No results found for "<strong>{searchQuery}</strong>". Try different keywords.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="search-books-results">
      <ol className="books-grid">
        {updatedBooks.map(book => (
          <Book
            key={book.id}
            book={book}
            shelf={book.shelf}
            onMove={onMove}
          />
        ))}
      </ol>
    </div>
  );
};

export default SearchResults;