import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [units, setUnits] = useState([{ title: '', sessions: [{ title: '', lectures: [''] }] }]);

  const handleAddClass = async () => {
    try {
      await axios.post('/api/class/create', { title, units }, {
        headers: { Authorization: localStorage.getItem('token') },
      });
      alert('Class created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating class');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Class Title"
      />
      {/* Add input fields to create units and sessions */}
      <button onClick={handleAddClass}>Create Class</button>
    </div>
  );
};

export default AdminDashboard;
