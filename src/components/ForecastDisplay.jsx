import React from 'react';
import { Calendar, Thermometer } from 'lucide-react';

// Weather Icons
import clearSky from '../assets/clear-sky.png';
import hot from '../assets/hot.png';
import rainyday from '../assets/rainy-day.png';
import snow from '../assets/snow.png';

const groupForecastByDay = (forecast) => {
  const dailyForecast = {};

  forecast.forEach((entry) => {
    const date = new Date(entry.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
    if (!dailyForecast[date]) {
      dailyForecast[date] = entry;
    }
  });

  return Object.values(dailyForecast).slice(0, 5); // Get only 5 days
};

const ForecastDisplay = ({ forecast }) => {
  const dailyForecast = groupForecastByDay(forecast);

  // Map weather descriptions to icons
  const weatherIcons = {
    'clear sky': clearSky,
    'hot': hot,
    'rain': rainyday,
    'snow': snow,
  };

  return (
    <div className="bg-white p-6 mt-4 rounded-xl shadow-lg text-center">
      <h2 className="text-xl font-semibold mb-3">5-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md">
            <p className="flex items-center justify-center gap-2 font-semibold">
              <Calendar size={18} /> {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
            <img
              src={weatherIcons[day.weather[0].description.toLowerCase()] || clearSky}
              alt="Weather Icon"
              className="w-12 h-12 mx-auto"
            />
            <p className="capitalize">{day.weather[0].description}</p>
            <p className="flex items-center justify-center gap-2">
              <Thermometer size={16} /> {day.main.temp}°C
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay;
