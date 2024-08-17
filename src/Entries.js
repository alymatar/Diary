import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Entries() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('https://diarybackend-hmie.onrender.com/api/diary-entries');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://diarybackend-hmie.onrender.com/api/diary-entries/${id}`);
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format as YYYY-MM-DD
  };

  return (
    <div>
      <Link to="/add-entry"><button>Add New Entry</button></Link>
      <h2>Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            <h3>{entry.title}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{entry.content}</p>
            <p><strong>Date:</strong> {formatDate(entry.created_at)}</p>
            <Link to={`/edit-entry/${entry.id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Entries;
