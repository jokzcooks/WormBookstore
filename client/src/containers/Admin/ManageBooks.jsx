import React, { useCallback, useEffect, useState } from 'react';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [newBookData, setNewBookData] = useState("")

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = useCallback(() => {
    fetch('http://localhost:5000/api/book')
      .then(res => res.json())
      .then(setBooks);
  });

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/book/${id}`, { method: 'DELETE' });
    fetchBooks();
  };

  const addBook = async (data) => {
    const res = await fetch("http://localhost:5000/api/book", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: newBookData
    })
    setNewBookData("")
    fetchBooks()
  }

  return (
    <div className='profileSettingsContainer'>
      <h2>Books</h2>
      {books.map(book => (
        <div key={book.id}>
          {book.title} - {book.author}
          <button onClick={() => handleDelete(book._id)}>🗑️</button>
        </div>
      ))}
      <div className='addRow'>
        <input value={newBookData} onChange={e => setNewBookData(e.target.value)} type="text" name="" id="" placeholder="New Book Data"  />
        <button onClick={() => {addBook()}}>Add Book</button>
      </div>
    </div>
  );
};

export default ManageBooks;
