import React from 'react-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import LectureProgress from './Lecture/LectureProgress';
const StudentDashboard = () => {
    const [lectures, setLectures] = useState([]);
  
    useEffect(() => {
      axios.get('/api/lectures')
        .then(res => setLectures(res.data))
        .catch(err => console.error(err));
    }, []);
  
    return (
      <div>
        <h2>My Progress</h2>
        <ul>
          {lectures.map(lecture => (
            <li key={lecture._id}>
              {lecture.title}
              <LectureProgress lectureId={lecture._id} />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default StudentDashboard;
  