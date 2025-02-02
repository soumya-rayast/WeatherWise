import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'e01a3a352547c0ac66e4999c0443c76e';
const API_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city) => {
  try {
    // for current day
    const currentWeatherResponse = await axios.get(`${API_URL}/weather`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });
    // for 5 days of weather data
    const forecastResponse = await axios.get(`${API_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: 'metric' }
    });

    return { 
      currentWeather: currentWeatherResponse.data, 
      forecast: forecastResponse.data.list 
    };
  } catch (error) {
    throw new Error('City not found or network error.');
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    city: '',
    currentWeather: null,
    forecast: [],
    error: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.currentWeather = action.payload.currentWeather;
        state.forecast = action.payload.forecast;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state) => {
        state.error = 'City not found or network error.';
        state.currentWeather = null;
        state.forecast = [];
      });
  }
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
