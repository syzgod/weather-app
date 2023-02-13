import React from 'react';

{
  /* Render list of city data: location name(city), country, flag, coords, weather icon, actual temp */
}

const LocationForecastList = ({ weatherData }: any) => {
  console.log(weatherData);
  console.log(weatherData.list);
  return weatherData.list ? (
    <div>
      <ul className='flex h-fit w-fit flex-wrap items-center justify-start text-lg'>
        {weatherData.list.map((forecast: any, index: number) => (
          <li
            key={index}
            className='mr-8 p-2 odd:bg-slate-700 even:bg-slate-500'
          >
            <span className='font-bold'>{forecast.dt_txt}</span>:{' '}
            <span
              className={
                forecast.main.temp >= 15 ? 'text-red-400' : 'text-blue-300'
              }
            >
              {forecast.main.temp}°C
            </span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default LocationForecastList;
