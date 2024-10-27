import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const getCordinates = async (place) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const URL = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`;

  const response = await axios.get(URL);

  //Returning the cordinates
  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
};

const getWeatherData = async (place) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  //Fetching the cordinates from the geoAPI
  const { lat, lon } = await getCordinates(place);
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  // Fetching the data from the API
  const response = await axios.get(URL);

  //Washing the data
  const weatherData = {
    city: response.data.name,
    country: response.data.sys.country,
    temperature: response.data.main.temp,
    description: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
  };
  return weatherData;
};

export { getWeatherData };
export { getCordinates };
