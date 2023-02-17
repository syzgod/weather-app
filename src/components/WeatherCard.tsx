import { useContext } from 'react';
import ApiContext from '../store/api-context';

// Calculate wind direction
import getDirection from '../helpers/windDirection';

// Icons
import { SiWindicss } from 'react-icons/si';
import { FaLocationArrow } from 'react-icons/fa';
import { BsArrowLeftRight, BsCloudsFill } from 'react-icons/bs';
import { MdLocationPin } from 'react-icons/md';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { WiHumidity } from 'react-icons/wi';

// TODO make 'Today' a variable and make 'Tomorrow' and dates following
// TODO Redesign to DISPLAY longer forecast (flip card for Today and the following days grouped) MAP through the API data
// TODO design webapp to show current + forecast properly (hourly, days)
// BUG fix states to not rerender too many components

const WeatherCard = (weatherData: any) => {
  const apiCtx = useContext(ApiContext);
  console.log(apiCtx);

  const calculateTime = (timeUnix: number) => {
    const time = new Date(timeUnix * 1000);
    const timezoneOffset = apiCtx.city.timezone;
    const offset = time.getTimezoneOffset() * 60;
    const date = new Date((timeUnix + timezoneOffset + offset) * 1000);

    const timeString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const [hour, minute] = timeString.split(':');
    return `${hour}:${minute}`;
  };

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const today = `${new Date().toLocaleDateString(
    'de-DE'
  )} - ${new Date().toLocaleTimeString()}`;
  // let day = date.getDate();
  // let month = date.getMonth() + 1;
  // let year = date.getFullYear();
  // let currentDate = `${day}-${month}-${year}`;

  const iconURL = 'http://openweathermap.org/img/wn/';

  return apiCtx.list?.length ? (
    <div className='min-h-96 mt-4 mr-7 flex w-96 flex-col items-center justify-center rounded-3xl border border-gray-300 bg-slate-400 bg-opacity-40 p-2 text-lg leading-relaxed shadow-md shadow-gray-700'>
      <span className='text-md'>{today}</span>
      <h1 className='flex flex-wrap items-center justify-center text-3xl font-bold'>
        <MdLocationPin size='25px' className='inline' />
        {apiCtx.city.name}, {apiCtx.city.country}{' '}
        <div className='ml-2 inline text-sm font-normal'>
          at{' '}
          <span className='text-2xl font-bold tracking-widest'>
            {calculateTime(apiCtx.list[0].dt)}
          </span>
        </div>
      </h1>
      <div className='flex flex-row items-center justify-center'>
        <p className=' '>
          <span className='mt-3 block'>feels like </span>{' '}
          <span className='text-6xl font-bold drop-shadow-[5px_5px_3px_rgba(0,0,0,0.6)]'>
            {Math.trunc(apiCtx.list[0].main.feels_like)}°{' '}
          </span>
        </p>
        <div className='flex'>
          actual:{' '}
          <div className='ml-2 font-bold'>
            {' '}
            {Math.trunc(apiCtx.list[0].main.temp)}°
          </div>
        </div>
        <p>
          max{' '}
          <span className='font-bold'>
            {Math.trunc(apiCtx.list[0].main.temp_max)}° /{' '}
          </span>
          min{' '}
          <span className='font-bold text-gray-200'>
            {Math.trunc(apiCtx.list[0].main.temp_min)}°
          </span>
        </p>
      </div>
      <div className='flex items-center'>
        <img src={`${iconURL}${apiCtx.list[0].weather[0].icon}.png`} alt='' />
        <div className='font-bold'>{apiCtx.list[0].weather[0].description}</div>
      </div>
      <div className='flex flex-row'>
        <div className='flex'>
          <FaLocationArrow
            className='mt-1.5 h-4 w-4 origin-center '
            style={{
              transform: `rotate(${apiCtx.list[0].wind.deg + 120}deg)`,
            }}
          />
          <span className='mx-2'>{getDirection(apiCtx)} </span>
        </div>

        <div className='inline'>
          <SiWindicss className='mx-2 inline' size='25px' />
          {apiCtx.list[0].wind.speed} km/h
        </div>
      </div>

      <div>Gust: {apiCtx.list[0].wind.gust || 'no data'} km/h</div>

      <FiSunrise size='25px' />
      <div>Sunrise: {calculateTime(apiCtx.city.sunrise)}</div>
      <FiSunset size='25px' />
      <div>Sunset: {calculateTime(apiCtx.city.sunset)}</div>
      <BsCloudsFill size='25px' />
      <div>Clouds cover: {apiCtx.list[0].clouds.all}%</div>
      <WiHumidity size='25px' />
      <div>Humidity: {apiCtx.list[0].main.humidity}%</div>
    </div>
  ) : null;
};

export default WeatherCard;
