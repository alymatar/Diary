import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'

function AddEntry() {
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/diary-entries', newEntry);
      navigate('/');  // Redirect to the main page after adding the entry
    } catch (error) {
      console.error('Error creating entry:', error);
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newEntry.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newEntry.content}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
}

export default AddEntry;
