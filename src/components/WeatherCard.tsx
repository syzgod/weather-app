import { useContext } from 'react';
import ApiContext from '../store/api-context';
import { CheckboxContext } from '../store/checkbox-context';
import { SiWindicss } from 'react-icons/si';
import { FaLocationArrow } from 'react-icons/fa';
import { BsArrowLeftRight, BsCloudsFill } from 'react-icons/bs';
import getDirection from '../helpers/windDirection';
import { MdLocationPin } from 'react-icons/md';
import { FiSunrise, FiSunset } from 'react-icons/fi';
import { WiHumidity } from 'react-icons/wi';

// TODO add extra functionality for UV, sunset, sunrise, visibility, humidity, weather alert, air quality
// TODO add geolocation data to weather card to immediately show user's location at load
// TODO calculateTime function to be flexible to be able to return needed time
// TODO make 'Today' a variable and make 'Tomorrow' and dates following
// TODO Redesign to add longer forecast
// BUG fix checkboxes to not rerender too many components

const WeatherCard = ({ weatherData }: any) => {
  // const date = new Date();
  const apiCtx = useContext(ApiContext);
  const [state, dispatch] = useContext(CheckboxContext);

  const calculateTime = (timeUnix: number) => {
    const time = new Date(timeUnix * 1000);
    const timezoneOffset = apiCtx.timezone;
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

  //   const calculateLocalTime = () => {
  //     const unixTimestamp = apiCtx.dt;
  //     const timezoneOffset = apiCtx.timezone;
  //
  //     const date = new Date(unixTimestamp * 1000);
  //     const offset = date.getTimezoneOffset() * 60;
  //     const localTime = new Date(
  //       (unixTimestamp + timezoneOffset + offset) * 1000
  //     );
  //
  //     const timeString = localTime.toLocaleTimeString([], {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit',
  //       hour12: false,
  //     });
  //     const [hour, minute] = timeString.split(':');
  //     return `${hour}:${minute}`;
  //   };
  //
  //   const calculateSunrise = () => {
  //     const sunrise = new Date(apiCtx.sys.sunrise * 1000);
  //
  //     const timeString = sunrise.toLocaleTimeString([], {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit',
  //       hour12: false,
  //     });
  //     const [hour, minute] = timeString.split(':');
  //     return `${hour}:${minute}`;
  //   };
  //   const calculateSunset = () => {
  //     const sunset = new Date(apiCtx.sys.sunset * 1000);
  //     const timeString = sunset.toLocaleTimeString([], {
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit',
  //       hour12: false,
  //     });
  //     const [hour, minute] = timeString.split(':');
  //     return `${hour}:${minute}`;
  //   };

  // let day = date.getDate();
  // let month = date.getMonth() + 1;
  // let year = date.getFullYear();
  // let currentDate = `${day}-${month}-${year}`;

  const iconURL = 'http://openweathermap.org/img/wn/';

  return apiCtx.weather?.length ? (
    <div className='flex h-96 w-72 transform items-center justify-center tracking-wider'>
      <div className='front min-w-72 mt-4 flex h-96 flex-col items-center justify-center rounded-3xl border border-gray-300 bg-slate-400 bg-opacity-40 p-2 text-lg leading-relaxed shadow-md shadow-gray-700'>
        <BsArrowLeftRight className='absolute top-3 left-5' />
        <span className='text-sm'>Weather Today in</span>
        <h1 className='flex flex-wrap items-center justify-center font-bold'>
          <MdLocationPin size='25px' className='inline' />
          {apiCtx.name}, {apiCtx.sys.country}{' '}
          <div className='ml-2 inline text-sm font-normal'>
            at{' '}
            <span className='text-lg font-bold tracking-widest'>
              {calculateTime(apiCtx.dt)}
            </span>
          </div>
        </h1>
        <p>
          <span className='mt-3 block'>feels like </span>{' '}
          <span className='text-6xl font-bold drop-shadow-[5px_5px_3px_rgba(0,0,0,0.6)]'>
            {Math.trunc(apiCtx.main.feels_like)}°{' '}
          </span>
        </p>
        <div className='flex'>
          actual:{' '}
          <div className='ml-2 font-bold'> {Math.trunc(apiCtx.main.temp)}°</div>
        </div>
        <p>
          max{' '}
          <span className='font-bold'>
            {Math.trunc(apiCtx.main.temp_max)}° /{' '}
          </span>
          min{' '}
          <span className='font-bold text-gray-200'>
            {Math.trunc(apiCtx.main.temp_min)}°
          </span>
        </p>
        <div className='flex items-center'>
          <img src={`${iconURL}${apiCtx.weather[0].icon}.png`} alt='' />
          <div className='font-bold'>{apiCtx.weather[0].description}</div>
        </div>
        {/* Map through checkboxes (state.checkboxes.map - import first) then display the corresponding value if it's checked. Eg. wind, wind speed etc */}
        <div className='flex flex-row'>
          {state.checkboxes.map((checkbox) =>
            checkbox.value === 'windDirection' && checkbox.checked ? (
              <div className='flex'>
                <FaLocationArrow
                  className='mt-1.5 h-4 w-4 origin-center '
                  style={{ transform: `rotate(${apiCtx.wind.deg + 120}deg)` }}
                />
                <span key={checkbox.value} className='mx-2'>
                  {getDirection(apiCtx)}{' '}
                </span>
              </div>
            ) : null
          )}
          {state.checkboxes.map((checkbox) =>
            checkbox.value === 'wind' && checkbox.checked ? (
              <div key={checkbox.value} className='inline'>
                <SiWindicss className='mx-2 inline' size='25px' />
                {apiCtx.wind.speed} km/h
              </div>
            ) : null
          )}
        </div>
        {state.checkboxes.map((checkbox) =>
          checkbox.value === 'windGust' && checkbox.checked ? (
            <div key={checkbox.value}>
              Gust: {apiCtx.wind.gust ? apiCtx.wind.gust : 'no data'} km/h
            </div>
          ) : null
        )}
      </div>
      <div className='back min-w-72 mt-4 flex h-96 flex-col items-center justify-center rounded-3xl border border-gray-300 bg-slate-400 bg-opacity-20 p-6 text-lg leading-relaxed shadow-md shadow-gray-700'>
        <FiSunrise size='25px' />
        <div>Sunrise: {calculateTime(apiCtx.sys.sunrise)}</div>
        <FiSunset size='25px' />
        <div>Sunset: {calculateTime(apiCtx.sys.sunset)}</div>
        <BsCloudsFill size='25px' />
        <div>Clouds cover: {apiCtx.clouds.all}%</div>
        <WiHumidity size='25px' />
        <div>Humidity: {apiCtx.main.humidity}%</div>
        <BsArrowLeftRight className='absolute top-3 left-5' />
      </div>
    </div>
  ) : null;
};

export default WeatherCard;
