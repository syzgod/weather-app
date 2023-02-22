import { SiWindicss } from 'react-icons/si';

{
  /* Render list of city data: location name(city), country, flag, coords, weather icon, actual temp */
}

const iconURL = 'http://openweathermap.org/img/wn/';

const LocationForecastList = ({ weatherData }: any) => {
  console.log(weatherData);
  console.log(weatherData.list);
  return weatherData.list ? (
    <div className='flex h-full w-5/6 items-center overflow-hidden rounded-xl border hover:overflow-x-scroll'>
      {weatherData.list.map((forecast: any, index: number) => (
        <div
          key={index}
          className='h-52 min-w-[8rem] p-2 text-center odd:bg-slate-700 odd:bg-opacity-80 even:bg-slate-500 even:bg-opacity-80'
        >
          <span className='font-bold '>{forecast.dt_txt}</span>{' '}
          <div className='flex flex-col items-center justify-center'>
            <span
              className={
                forecast.main.temp >= 15
                  ? 'text-3xl text-red-400'
                  : 'text-3xl text-blue-300'
              }
            >
              {forecast.main.temp}°C
            </span>
            <img src={`${iconURL}${forecast.weather[0].icon}.png`} alt='' />
          </div>
          <span className='text-md'>{forecast.weather[0].description}</span>
          <div>
            <SiWindicss className='mx-2 inline' size='20px' />
            {forecast.wind.speed} km/h
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default LocationForecastList;
