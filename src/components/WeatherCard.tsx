import React from 'react';
import cloud from '../assets/icons/2995000_cloud_weather_cloudy_rain_sun_icon.png';
import sun from '../assets/icons/1530392_weather_sun_sunny_temperature_icon.png';

const WeatherCard = ({ weatherData }: any) => {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  return (
    <div className='mt-4 flex w-2/3 flex-col items-center justify-center rounded-3xl border border-b-8 border-r-8 border-slate-800 bg-slate-400 bg-opacity-20 p-6 text-lg leading-relaxed'>
      {weatherData.weather[0].description.includes('cloud') ? (
        <img className='h-16 w-16' src={cloud} alt='' />
      ) : null}
      {weatherData.weather[0].description.includes('sun') ||
      weatherData.weather[0].description.includes('clear') ? (
        <img className='h-16 w-16' src={sun} alt='' />
      ) : null}
      <h1 className='font-bold'>
        {weatherData.name}, {weatherData.sys.country}
      </h1>
      <h3 className=''>{currentDate}</h3>

      <h2 className=''>Current weather</h2>

      <p>
        <span className='font-bold'>{Math.trunc(weatherData.main.temp)}</span>{' '}
        feels like{' '}
        <span className='font-bold'>
          {Math.trunc(weatherData.main.feels_like)}
        </span>
      </p>
      <p>
        highest{' '}
        <span className='font-bold'>
          {Math.trunc(weatherData.main.temp_max)}
        </span>
      </p>
      <p>
        lowest{' '}
        <span className='font-bold text-gray-200'>
          {Math.trunc(weatherData.main.temp_min)}
        </span>
      </p>
      <div className='font-bold'>{weatherData.weather[0].description}</div>
    </div>
  );
};

export default WeatherCard;