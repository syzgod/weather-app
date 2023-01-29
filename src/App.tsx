import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useGeolocated } from 'react-geolocated';
import cloud from './assets/icons/2995000_cloud_weather_cloudy_rain_sun_icon.png';
import sun from './assets/icons/1530392_weather_sun_sunny_temperature_icon.png';
import Checkbox from './components/Checkbox';

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [location, setLocation] = useState('dorfen');
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(url);
        setWeatherData(response);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  const locationHandle = (e: any): any => {
    e.preventDefault();
    setLocation(ref.current!.value);
  };

  const options = [
    { label: 'Wind', value: 'option1', checked: false },
    { label: 'Wind direction', value: 'option2', checked: false },
    { label: 'Option 3', value: 'option3', checked: false },
  ];

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      setLat(coords.latitude);
      setLong(coords.longitude);
      console.log(lat, long);
    }
  }, [coords, lat, long, isGeolocationAvailable, isGeolocationEnabled]);

  const getPlaceHandle = (lat: number, long: number): any => {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(url);
        setLocation(response.name);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-sky-800 to-slate-900'>
      <div className='rounded-3xl border-2 border-gray-900 bg-transparent p-6 text-gray-200 shadow-xl shadow-gray-900 backdrop-blur-md'>
        <h1 className='text mb-4 items-center justify-center border-b-2 border-gray-200 pb-4 text-center text-4xl font-bold'>
          My Weather App
        </h1>
        {!isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : coords && !loading ? (
          <div className='mb-4 flex flex-col items-center justify-center'>
            <div className='mb-3 flex w-fit flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-slate-400 bg-opacity-20 p-3'>
              <div>Current location coords: </div>
              <table>
                <tbody>
                  <tr className='flex flex-col'>
                    <td className='font-bold'>Latitude: </td>
                    <td>{coords.latitude}</td>
                  </tr>
                  <tr className='flex flex-col'>
                    <td className='font-bold'>Longitude: </td>
                    <td>{coords.longitude}</td>
                  </tr>
                  {/*<tr>
                        <td>altitude</td>
                        <td>{coords.altitude}</td>
                      </tr>
                      <tr>
                        <td>heading</td>
                        <td>{coords.heading}</td>
                      </tr>
                      <tr>
                        <td>speed</td>
                        <td>{coords.speed}</td>
                </tr>*/}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => getPlaceHandle(coords.latitude, coords.longitude)}
              className='h-12 rounded-full border-2 border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-center hover:bg-opacity-50'
            >
              Get my location
            </button>
          </div>
        ) : (
          <div>Getting the location data&hellip; </div>
        )}
        <hr />
        <form
          onSubmit={locationHandle}
          className='mt-4 flex flex-col items-center justify-center'
        >
          <div className='flex flex-col items-center justify-center text-lg'>
            <div>
              <input
                ref={ref}
                className='m-2 w-fit rounded-2xl border-2 border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-300'
                type='text'
                name=''
                id=''
                placeholder='Enter location name'
              />
              <button
                className='h-12 rounded-full border-2 border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-center hover:bg-opacity-50'
                type='submit'
              >
                Get location
              </button>
              <Checkbox
                options={options}
                wind={weatherData.wind.speed}
                windDirection={weatherData.wind.deg}
              />
            </div>
          </div>
          {loading && <div>Loading...</div>}
          {!loading ? (
            <>
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
                  <span className='font-bold'>
                    {Math.trunc(weatherData.main.temp)}
                  </span>{' '}
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
                <div className='font-bold'>
                  {weatherData.weather[0].description}
                </div>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default App;
