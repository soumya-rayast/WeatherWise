import React from 'react';
import { Sun, CloudRain, Wind, Thermometer } from 'lucide-react';

// Assets
import clearSky from '../assets/clear-sky.png';
import hot from '../assets/hot.png';
import rainyday from '../assets/rainy-day.png';
import snow from '../assets/snow.png';

const WeatherDisplay = ({ weather }) => {
  // Map the weather descriptions to corresponding icons
  const weatherIcons = {
    'clear sky': clearSky,
    'hot': hot,
    'rain': rainyday,
    'snow': snow,
  };

  // Get the appropriate icon based on the current weather description
  const weatherIcon = weatherIcons[weather.weather[0].description.toLowerCase()] || clearSky; 

  return (
    <div className="bg-white p-6 mt-4 rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-semibold">{weather.name}</h2>
      <div className="flex justify-center items-center space-x-3 mt-2">
        <img
          src={weatherIcon} 
          alt="Custom Weather Icon"
          className="w-16 h-16 object-cover"
        />
        <p className="capitalize text-lg">{weather.weather[0].description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <p className="flex items-center justify-center gap-2">
            <Thermometer /> Temperature: {weather.main.temp}°C
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <p className="flex items-center justify-center gap-2">
            <CloudRain /> Humidity: {weather.main.humidity}%
          </p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <p className="flex items-center justify-center gap-2">
            <Wind /> Wind Speed: {weather.wind.speed} m/s
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
