import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const LectureProgress = ({ lectureId }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleMarkCompleted = () => {
    axios.post(`/api/progress/lecture/${lectureId}`)
      .then(() => {
        setIsCompleted(true);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Button onClick={handleMarkCompleted} disabled={isCompleted}>
        {isCompleted ? 'Completed' : 'Mark as Completed'}
      </Button>
    </div>
  );
};

export default LectureProgress;
