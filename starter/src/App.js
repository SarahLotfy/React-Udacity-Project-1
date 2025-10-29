import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksList from './BooksList';
import BookSearch from './BookSearch';

const bookshelves = [
  { key: 'currentlyReading', name: 'Currently Reading' },
  { key: 'wantToRead', name: 'Want to Read' },
  { key: 'read', name: 'Read' }
];

const BooksApp = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    BooksAPI.getAll()
      .then(books => setMyBooks(books))
      .catch(err => {
        console.error('Error fetching books:', err);
        setError(true);
      });
  }, []);

  const moveBook = useCallback((book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        if (shelf === 'none') {
          setMyBooks(prevBooks => prevBooks.filter(b => b.id !== book.id));
        } else {
          const updatedBook = { ...book, shelf };
          setMyBooks(prevBooks => 
            prevBooks.filter(b => b.id !== book.id).concat(updatedBook)
          );
        }
      })
      .catch(err => {
        console.error('Error moving book:', err);
        setError(true);
      });
  }, []);

  const handleSearch = useCallback(async (query) => {
    setSearchQuery(query);
    
    // Clear results if query is empty
    if (!query.trim()) {
      setSearchBooks([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const books = await BooksAPI.search(query.trim(), 20);
      
      if (books.error) {
        setSearchBooks([]);
      } else if (Array.isArray(books)) {
        setSearchBooks(books);
      } else {
        setSearchBooks([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchBooks([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const resetSearch = useCallback(() => {
    setSearchBooks([]);
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>Network Error</h2>
        <p>Please check your connection and try again later.</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <BooksList
                bookshelves={bookshelves}
                books={myBooks}
                onMove={moveBook}
              />
            }
          />
          <Route
            path="/search"
            element={
              <BookSearch
                searchBooks={searchBooks}
                myBooks={myBooks}
                searchQuery={searchQuery}
                onSearch={handleSearch}
                onMove={moveBook}
                onResetSearch={resetSearch}
                isSearching={isSearching}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default BooksApp;