import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ErrorComponent from './components/ErrorComponent';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './index.css';

const API_KEY = 'e01a3a352547c0ac66e4999c0443c76e';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const App = () => {
  const [city, setCity] = useState(localStorage.getItem('lastCity') || '');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem('searchHistory')) || []);

  useEffect(() => {
    if (city) {
      fetchWeather(city);
      localStorage.setItem('lastCity', city);
      const updatedHistory = [...new Set([city, ...searchHistory])].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  }, [city]);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(`${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('City not found or network error.');
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row h-full flex-wrap md:flex-nowrap">
        <Sidebar searchHistory={searchHistory} setCity={setCity} />
        <div className="flex flex-col items-center p-6 bg-gray-100 w-full md:w-3/4 lg:w-4/5">
          <SearchBar setCity={setCity} />
          {error && <ErrorComponent message={error} />}
          {weather && <WeatherDisplay weather={weather} />}
        </div>
      </div>
    </div>
  );
};

export default App;
