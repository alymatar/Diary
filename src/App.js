import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entries from './Entries';
import AddEntry from './AddEntry';
import EditEntry from './EditEntry'; // Import the EditEntry component
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <h1>My Diary</h1>
        <Routes>
          <Route path="/" element={<Entries />} />
          <Route path="/add-entry" element={<AddEntry />} />
          <Route path="/edit-entry/:id" element={<EditEntry />} /> {/* New route for editing */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
