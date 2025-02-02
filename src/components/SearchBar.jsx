import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const suggestions = [
  "Mumbai, Maharashtra",
  "Delhi",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Hyderabad, Telangana",
  "Ahmedabad, Gujarat",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Surat, Gujarat",
  "Visakhapatnam, Andhra Pradesh",
  "Bhopal, Madhya Pradesh",
  "Indore, Madhya Pradesh",
  "Vadodara, Gujarat",
  "Patna, Bihar",
  "Coimbatore, Tamil Nadu",
  "Kochi, Kerala",
  "Madurai, Tamil Nadu",
  "Agra, Uttar Pradesh",
  "Vijayawada, Andhra Pradesh",
  "Chandigarh",
  "Nashik, Maharashtra",
  "Gurgaon, Haryana",
  "Noida, Uttar Pradesh",
  "Mysore, Karnataka",
  "Udaipur, Rajasthan",
  "Ranchi, Jharkhand",
  "Dehradun, Uttarakhand"
];

const SearchBar = ({ setCity }) => {
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    const storedCity = localStorage.getItem("searchedCity");
    if (storedCity) {
      setInput(storedCity);
    }
  }, []);


  const handleSearch = () => {
    if (input.trim() !== "") {
      setCity(input); 
      saveToHistory(input); 
      setInput("");
      setFilteredSuggestions([]);
    }
  };
  const saveToHistory = (city) => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!storedHistory.includes(city)) {
      storedHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(storedHistory));
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    saveToHistory(suggestion);
    setInput(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-lg">
        <input
          type="text"
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter city name..."
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition flex items-center justify-center"
        >
          <Search size={24} />
        </button>
      </div>
      {filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full max-w-md">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;