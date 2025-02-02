import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather, setCity } from './Redux/weatherSlice.js';

import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import ErrorComponent from './components/ErrorComponent';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const { city, currentWeather, forecast, error } = useSelector(state => state.weather);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      console.log("Fetching weather for last city:", lastCity);
      dispatch(fetchWeather(lastCity));
    }
  }, [dispatch]);
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row h-full flex-wrap md:flex-nowrap">
        <Sidebar setCity={(city) => dispatch(setCity(city))} />
        <div className="flex flex-col items-center p-6 bg-gray-100 w-full md:w-3/4 lg:w-4/5">
        <SearchBar setCity={(city) => dispatch(fetchWeather(city))} />
          {error && <ErrorComponent message={error} />}
          {currentWeather && <WeatherDisplay weather={currentWeather} />}
          {forecast.length > 0 && <ForecastDisplay forecast={forecast} />}
        </div>
      </div>
    </div>
  );
};

export default App;