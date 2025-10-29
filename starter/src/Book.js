import React from 'react';
import ShelfChanger from './ShelfChanger';

const Book = ({ book, shelf, onMove }) => {

 const safeBook = {
    ...book,
    imageLinks: book.imageLinks || { thumbnail: '' },
    authors: book.authors || ['Unknown Author'],
    title: book.title || 'No Title Available'
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${safeBook.imageLinks.thumbnail || 'icons/book-placeholder.svg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <ShelfChanger 
            book={safeBook} 
            shelf={shelf} 
            onMove={onMove} 
          />
        </div>
        <div className="book-title">{safeBook.title}</div>
        <div className="book-authors">
          {Array.isArray(safeBook.authors) 
            ? safeBook.authors.join(', ') 
            : safeBook.authors}
        </div>
      </div>
    </li>
  );
};

export default Book;