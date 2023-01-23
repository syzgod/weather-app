import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

// interface IncomingData {
//   coord: {
//     lon: number;
//     lat: number;
//   };
//   weather: [
//     {
//       id: number;
//       main: string;
//       description: string;
//       icon: string;
//     }
//   ];
//   base: string;
//   main: {
//     temp: number;
//     feels_like: number;
//     temp_min: number;
//     temp_max: number;
//     pressure: number;
//     humidity: number;
//     sea_level: number;
//     grnd_level: number;
//   };
//   visibility: number;
//   wind: {
//     speed: number;
//     deg: number;
//     gust: number;
//   };
//   clouds: {
//     all: number;
//   };
//   dt: number;
//   sys: {
//     type: number;
//     id: number;
//     country: string;
//     sunrise: number;
//     sunset: number;
//   };
//   timezone: number;
//   id: number;
//   name: string;
//   cod: number;
// }

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [location, setLocation] = useState('dorfen');
  const [loading, setLoading] = useState(true);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`;

  const unsplashUrl = `https://api.unsplash.com/photos/?client_id=_PcVFcZsvxacQ7I_ydTAZmYD8qs6g5NheuwuiBnQ7bg&search?query=sunny`;

  // useEffect(() => {
  //   axios.get(url).then((response) => setWeatherData(response.data));
  // }, [url]);

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

  return (
    <div className='flex min-h-screen flex-col'>
      <h1 className='items-center justify-center text-2xl font-bold'>
        My Weather App
      </h1>
      <form onSubmit={locationHandle}>
        <input
          ref={ref}
          className='m-2 w-fit border-2 border-gray-600 p-2'
          type='text'
          name=''
          id=''
          placeholder='Enter location name'
        />
        <button
          className='rounded-full border-2 border-gray-600 p-2 hover:bg-green-400'
          type='submit'
        >
          Get location
        </button>
        {loading && <div>Loading...</div>}
        {!loading ? (
          <>
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
          </>
        ) : null}
      </form>
    </div>
  );
}

export default App;
