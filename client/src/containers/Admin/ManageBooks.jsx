import React, { useCallback, useEffect, useState } from 'react';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = useCallback(() => {
    fetch('http://localhost:5000/books')
      .then(res => res.json())
      .then(setBooks);
  });

  const handleDelete = async (id) => {
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    fetchBooks(); // Refresh the list after delete
  };

  return (
    <div className='profileSettingsContainer'>
      <h2>Books</h2>
      {books.map(book => (
        <div key={book.id}>
          {book.title} - {book.author}
          <button onClick={() => handleDelete(book.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
};

export default ManageBooks;
