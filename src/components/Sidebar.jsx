import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../Redux/weatherSlice.js'; 

const Sidebar = () => {
  const dispatch = useDispatch();
  const [searchHistory, setSearchHistory] = useState([]);
  useEffect(() => {
    const loadHistory = () => {
      const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
      setSearchHistory(storedHistory);
    };
    loadHistory();
    window.addEventListener('storage', loadHistory);
    return () => {
      window.removeEventListener('storage', loadHistory);
    };
  }, []);

  const handleSearchClick = (city) => {
    dispatch(fetchWeather(city)); 
  };

  return (
    <div className="hidden md:block w-1/4 bg-gray-200 p-4 h-full overflow-auto shadow-md">
      <h2 className="text-lg font-semibold mb-2">Search History</h2>
      {searchHistory.length === 0 ? (
        <p className="text-gray-500">No search history available.</p>
      ) : (
        <ul>
          {searchHistory.slice(0, 7).map((city, index) => (
            <li
              key={index}
              className="cursor-pointer p-2 bg-white mb-2 rounded-md shadow hover:bg-gray-300 transition"
              onClick={() => handleSearchClick(city)} 
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;