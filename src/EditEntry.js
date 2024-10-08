import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css'; // Ensure CSS is imported

function EditEntry() {
  const { id } = useParams(); // Get the ID from the URL
  const [entry, setEntry] = useState({ title: '', content: '', created_at: '' });
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  useEffect(() => {
    fetchEntry();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [entry.content]);

  const fetchEntry = async () => {
    try {
      const response = await axios.get(`https://diarybackend-hmie.onrender.com/api/diary-entries/${id}`);
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching entry:', error);
    }
  };

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://diarybackend-hmie.onrender.com/api/diary-entries/${id}`, entry);
      navigate('/'); // Redirect to the main page after editing
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ''; // Return empty string if dateString is invalid
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10); // Format as YYYY-MM-DD if valid
  };

  return (
    <div>
      <h2>Edit Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={entry.title}
          onChange={handleChange}
        />
        <textarea
          ref={textareaRef}
          name="content"
          placeholder="Content"
          value={entry.content}
          onChange={handleChange}
          style={{ overflow: 'hidden', resize: 'none' }}
        ></textarea>
        <p className="date"><strong>Date:</strong> {formatDate(entry.created_at)}</p>
        <button type="submit">Update Entry</button>
      </form>
    </div>
  );
}

export default EditEntry;
