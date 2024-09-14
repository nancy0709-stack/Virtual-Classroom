// src/components/ClassView.js
import React from 'react';
import axios from 'axios';

const ClassView = ({ classId }) => {
  const handleEnroll = () => {
    axios.post(`/api/users/enroll/${classId}`)
      .then(res => alert(res.data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <button onClick={handleEnroll}>Enroll in Class</button>
    </div>
  );
};

export default ClassView;
