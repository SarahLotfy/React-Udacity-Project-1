import React, { useState } from 'react';

const ShelfChanger = ({ book, shelf, onMove }) => {
  const [currentShelf, setCurrentShelf] = useState(shelf || 'none');

  const handleChange = (event) => {
    const newShelf = event.target.value;
    setCurrentShelf(newShelf);
    onMove(book, newShelf);
  };

  return (
    <div className="book-shelf-changer">
      <select value={currentShelf} onChange={handleChange}>
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default ShelfChanger;