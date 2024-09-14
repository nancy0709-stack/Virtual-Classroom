import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get(`/api/classes/search?query=${query}`)
      .then(res => setResults(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search classes"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(cls => (
          <li key={cls._id}>{cls.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
