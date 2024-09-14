import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const LectureDiscussion = ({ lectureId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    socket.on('newComment', (data) => {
      if (data.lectureId === lectureId) {
        setComments((prevComments) => [...prevComments, data.comment]);
      }
    });

    return () => {
      socket.off('newComment');
    };
  }, [lectureId]);

  return (
    <div>
      <h3>Discussion</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default LectureDiscussion;
