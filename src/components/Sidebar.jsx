import React from 'react';

const Sidebar = ({ searchHistory, setCity }) => {
  return (
    <div className="w-1/4 bg-gray-200 p-4 h-full overflow-auto shadow-md">
      <h2 className="text-lg font-semibold mb-2">Search History</h2>
      {searchHistory.length === 0 ? (
        <p className="text-gray-500">No search history available.</p>
      ) : (
        <ul>
          {searchHistory.map((city) => (
            <li
              key={city}
              className="cursor-pointer p-2 bg-white mb-2 rounded-md shadow hover:bg-gray-300 transition"
              onClick={() => setCity(city)}
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
