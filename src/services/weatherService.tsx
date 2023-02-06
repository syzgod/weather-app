import axios from 'axios';

const apiKey = 'd5bb22a0a83465db34afc639b332703c';

export const getPlaceHandle = (lat: number, long: number): Promise<any> => {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${apiKey}`;
  return axios.get(url);
};

export const getWeatherData = (location: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  return axios.get(url);
};

export const getForecastData = (lat: number, long: number) => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
};
