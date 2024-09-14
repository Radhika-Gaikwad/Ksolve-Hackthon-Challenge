import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('/api/class/enrolled-classes', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Your Enrolled Classes</h1>
      {classes.map((cls) => (
        <div key={cls._id}>
          <h2>{cls.title}</h2>
          {/* Add logic to display class units and sessions */}
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
