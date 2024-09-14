import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axios.get('/api/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Classes</h3>
      <ul>
        {classes.map(cls => (
          <li key={cls._id}>{cls.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
