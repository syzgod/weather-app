import axios from 'axios';

const apiKey = 'd5bb22a0a83465db34afc639b332703c';

// Getting the name of the location(city)

export const getPlaceHandle = (lat: number, long: number): Promise<any> => {
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&appid=${apiKey}`;
  return axios.get(url);
};

// Getting the weather at the city's location

export const getWeatherData = (location: string): Promise<any> => {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
  return axios.get(url);
};

// Getting multiple locations with the same name (limited to 5 locations)

export const getLocations = (location: string): Promise<any> => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}&units=metric`;
  return axios.get(url);
};
