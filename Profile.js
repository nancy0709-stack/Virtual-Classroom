import React, { useState } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = () => {
    axios.put('/api/users/profile', { username, email })
      .then(res => alert(res.data.message))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default ProfileSettings;
