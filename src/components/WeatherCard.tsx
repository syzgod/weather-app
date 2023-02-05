import { useContext } from 'react';
import ApiContext from '../store/api-context';
import { CheckboxContext } from '../store/checkbox-context';
import { WiCelsius } from 'react-icons/wi';
import { SiWindicss } from 'react-icons/si';
import { FaLocationArrow } from 'react-icons/fa';
import { BsArrowLeftRight } from 'react-icons/bs';
import getDirection from '../helpers/windDirection';

// TODO show wind directions from DEGREE (arrow)
// TODO display local time on the weather card and
// TODO show icons corresponding to weather and time / convert time to daytime and nighttime
// TODO add extra functionality for UV, sunset, sunrise, visibility, humidity, weather alert, air quality
// BUG fix checkboxes to not rerender too many components
// BUG save extra variables using async/await

const WeatherCard = ({ weatherData }: any) => {
  const date = new Date();
  const apiCtx = useContext(ApiContext);
  const [state, dispatch] = useContext(CheckboxContext);

  const calculateLocalTime = () => {
    // const timezoneOffset = apiCtx.timezone; // time zone offset in minutes
    // const date = new Date();
    // const localTime = new Date(date.getTime() + timezoneOffset * 60 * 1000);
    // const timeString = date.toLocaleTimeString([], {
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   second: '2-digit',
    // });
    // const [hour, minute] = timeString.split(':');
    // return `${hour}:${minute}`;
    const unixTimestamp = apiCtx.dt;
    const timezoneOffset = apiCtx.timezone;

    const date = new Date(unixTimestamp * 1000);
    const offset = date.getTimezoneOffset() * 60;
    const localTime = new Date(
      (unixTimestamp + timezoneOffset + offset) * 1000
    );

    const timeString = localTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const [hour, minute] = timeString.split(':');
    return `${hour}:${minute}`;
  };

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const iconURL = 'http://openweathermap.org/img/wn/';
  // let icon = `${apiCtx.weather[0].icon}.png`;

  // console.log(deg);

  return apiCtx.weather?.length ? (
    <div className='flex h-96 w-72 transform items-center justify-center '>
      <div className='front mt-4 flex h-96 w-72 flex-col items-center justify-center rounded-3xl border border-gray-300 bg-slate-400 bg-opacity-20 p-6 text-lg leading-relaxed shadow-md shadow-gray-900'>
        <BsArrowLeftRight className='absolute top-3 left-5' />
        <img src={`${iconURL}${apiCtx.weather[0].icon}.png`} alt='' />
        <span>Weather Today in</span>
        <h1 className='font-bold'>
          {apiCtx.name}, {apiCtx.sys.country}
        </h1>
        <h3 className=''>at {calculateLocalTime()}</h3>
        <p>
          <span className='font-bold'>
            {Math.trunc(apiCtx.main.temp)}
            <WiCelsius className='-m-3  inline' size='45px' />
          </span>{' '}
          feels like{' '}
          <span className='font-bold'>
            {Math.trunc(apiCtx.main.feels_like)}
            <WiCelsius className='-m-3  inline' size='45px' />
          </span>
        </p>
        <p>
          max{' '}
          <span className='font-bold'>
            {Math.trunc(apiCtx.main.temp_max)}
            <WiCelsius className='-m-3  inline' size='45px' />
          </span>
        </p>
        <p>
          min{' '}
          <span className='font-bold text-gray-200'>
            {Math.trunc(apiCtx.main.temp_min)}
            <WiCelsius className='-m-3  inline' size='45px' />
          </span>
        </p>
        <div className='font-bold'>{apiCtx.weather[0].description}</div>
        {/* Map through checkboxes (state.checkboxes.map - import first) then display the corresponding value if it's checked. Eg. wind, wind speed etc */}
        <div className='flex flex-row'>
          <SiWindicss className='mx-2 inline' size='25px' />
          {state.checkboxes.map((checkbox) =>
            checkbox.value === 'windDirection' && checkbox.checked ? (
              <div className='flex'>
                <span key={checkbox.value} className='mx-2'>
                  {getDirection(apiCtx)}{' '}
                </span>
                <FaLocationArrow
                  className='mr-5 mt-1.5 h-4 w-4 origin-center '
                  style={{ transform: `rotate(${apiCtx.wind.deg - 45}deg)` }}
                />
              </div>
            ) : null
          )}
          {state.checkboxes.map((checkbox) =>
            checkbox.value === 'wind' && checkbox.checked ? (
              <div key={checkbox.value} className='inline'>
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
      <div className='back mt-4 flex h-96 w-72 flex-col items-center justify-center rounded-3xl border border-gray-300 bg-slate-400 bg-opacity-20 p-6 text-lg leading-relaxed shadow-md shadow-gray-900'>
        <div>Clouds cover: {apiCtx.clouds.all}%</div>
        <BsArrowLeftRight className='absolute top-3 left-5' />
      </div>
    </div>
  ) : null;
};

export default WeatherCard;
