import React from 'react';

{
  /* Render list of city data: location name(city), country, flag, coords, weather icon, actual temp */
}

const iconURL = 'http://openweathermap.org/img/wn/';

const LocationForecastList = ({ weatherData }: any) => {
  console.log(weatherData);
  console.log(weatherData.list);
  return weatherData.list ? (
    <div className='grid h-fit grid-flow-col grid-rows-6 gap-2 '>
      {weatherData.list.map((forecast: any, index: number) => (
        <div
          key={index}
          className='grid-item p-2 text-center odd:bg-slate-700 even:bg-slate-500'
        >
          <span className='font-bold '>{forecast.dt_txt}</span>{' '}
          <div className='flex items-center justify-center'>
            <img src={`${iconURL}${forecast.weather[0].icon}.png`} alt='' />
            <span
              className={
                forecast.main.temp >= 15
                  ? 'text-xl text-red-400'
                  : 'text-xl text-blue-300'
              }
            >
              {forecast.main.temp}°C
            </span>
          </div>
          <span className='text-md'>{forecast.weather[0].description}</span>
        </div>
      ))}
    </div>
  ) : null;
};

export default LocationForecastList;
