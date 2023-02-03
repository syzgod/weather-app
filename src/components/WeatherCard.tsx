import { useContext } from 'react';
import ApiContext from '../store/api-context';
import { CheckboxContext } from '../store/checkbox-context';
import { WiCelsius } from 'react-icons/wi';
import { SiWindicss } from 'react-icons/si';

// TODO show wind directions from DEGREE
// TODO display local time on the weather card and
// TODO show icons corresponding to weather and time / convert time to daytime and nighttime
// TODO add extra functionality for UV, sunset, sunrise, visibility, humidity, weather alert, air quality
// BUG fix checkboxes to not rerender too many components
// BUG save extra variables using async/await

const WeatherCard = ({ weatherData }: any) => {
  const date = new Date();
  const apiCtx = useContext(ApiContext);
  const [state, dispatch] = useContext(CheckboxContext);

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const iconURL = 'http://openweathermap.org/img/wn/';
  // let icon = `${apiCtx.weather[0].icon}.png`;

  const getDirection = () => {
    let deg: number | string = Math.floor(apiCtx.wind.deg);
    switch (true) {
      case deg >= 360 && deg <= 21:
        deg = 'N';
        break;
      case deg >= 22 && deg <= 44:
        deg = 'NNE';
        break;
      case deg >= 45 && deg <= 66:
        deg = 'NE';
        break;
      case deg >= 67 && deg <= 89:
        deg = 'ENE';
        break;
      case deg >= 90 && deg <= 111:
        deg = 'E';
        break;
      case deg >= 112 && deg <= 134:
        deg = 'ESE';
        break;
      case deg >= 135 && deg <= 156:
        deg = 'SE';
        break;
      case deg >= 157 && deg <= 179:
        deg = 'SSE';
        break;
      case deg >= 180 && deg <= 201:
        deg = 'S';
        break;
      case deg >= 202 && deg <= 224:
        deg = 'SSW';
        break;
      case deg >= 225 && deg <= 246:
        deg = 'SW';
        break;
      case deg >= 247 && deg <= 269:
        deg = 'WSW';
        break;
      case deg >= 270 && deg <= 291:
        deg = 'W';
        break;
      case deg >= 292 && deg <= 314:
        deg = 'WNW';
        break;
      case deg >= 315 && deg <= 336:
        deg = 'NW';
        break;
      case deg >= 337 && deg <= 359:
        deg = 'NNW';
        break;
      default:
        deg = 'no data';
    }
    return deg;
  };
  // console.log(deg);

  return apiCtx.weather?.length ? (
    <div className='mt-4 flex w-2/3 flex-col items-center justify-center rounded-3xl border border-b-8 border-r-8 border-slate-800 bg-slate-400 bg-opacity-20 p-6 text-lg leading-relaxed'>
      <img src={`${iconURL}${apiCtx.weather[0].icon}.png`} alt='' />
      <p>{apiCtx.wind.deg}</p>
      <h1 className='font-bold'>
        {apiCtx.name}, {apiCtx.sys.country}
      </h1>
      <h3 className=''>{currentDate}</h3>
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
            <span key={checkbox.value} className='mr-2'>
              {getDirection()}{' '}
            </span>
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
          <div key={checkbox.value}>{apiCtx.wind.gust} km/h</div>
        ) : null
      )}
    </div>
  ) : null;
};

export default WeatherCard;
