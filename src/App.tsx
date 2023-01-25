import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useGeolocated } from 'react-geolocated';

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [location, setLocation] = useState('dorfen');
  const [loading, setLoading] = useState(true);
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();

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
  });

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
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-800'>
      <div className='rounded-3xl border-2 border-gray-900 bg-gray-700 p-6 text-gray-200 shadow-xl shadow-gray-900'>
        <h1 className='text mb-4 items-center justify-center border-b-2 border-green-600 pb-4 text-center text-4xl font-bold'>
          My Weather App
        </h1>
        {!isGeolocationAvailable ? (
          <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
          <div>Geolocation is not enabled</div>
        ) : coords && !loading ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td>latitude</td>
                  <td>{coords.latitude}</td>
                </tr>
                <tr>
                  <td>longitude</td>
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
            <button
              onClick={() => getPlaceHandle(coords.latitude, coords.longitude)}
              className='ml-3 rounded-3xl border p-2 hover:bg-gray-300 hover:text-gray-700'
            >
              Get my location
            </button>
          </>
        ) : (
          <div>Getting the location data&hellip; </div>
        )}
        <form onSubmit={locationHandle}>
          <div className='flex items-center justify-center text-lg'>
            <input
              ref={ref}
              className='m-2 w-fit rounded-2xl border-2 border-gray-600 bg-gray-400 p-2 text-gray-700 placeholder-gray-700 focus:outline-none focus:ring focus:ring-green-600'
              type='text'
              name=''
              id=''
              placeholder='Enter location name'
            />
            <button
              className='h-12 rounded-full border-2 border-gray-600 p-2 text-center hover:bg-green-600 hover:text-gray-700 hover:shadow-inner hover:shadow-gray-700'
              type='submit'
            >
              Get location
            </button>
          </div>
          {loading && <div>Loading...</div>}
          {!loading ? (
            <>
              <div className='mt-4 rounded-3xl border border-b-8 border-l-8 border-green-600 bg-gray-600 p-6 text-lg leading-relaxed'>
                <h1>
                  Current weather in{' '}
                  <span className='font-bold'>
                    {weatherData.name}, {weatherData.sys.country}
                  </span>
                </h1>
                <p>
                  The actual temperature is:{' '}
                  <span className='font-bold'>
                    {Math.trunc(weatherData.main.temp)}
                  </span>{' '}
                  which feels like{' '}
                  <span className='font-bold'>
                    {Math.trunc(weatherData.main.feels_like)}
                  </span>
                </p>
                <p>
                  The highest temperature is:{' '}
                  <span className='font-bold'>
                    {Math.trunc(weatherData.main.temp_max)}
                  </span>
                </p>
                <p>
                  The lowest temperature is:{' '}
                  <span className='font-bold'>
                    {Math.trunc(weatherData.main.temp_min)}
                  </span>
                </p>
                <p>
                  Current conditions:{' '}
                  <span className='font-bold'>
                    {weatherData.weather[0].description}
                  </span>
                </p>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default App;
