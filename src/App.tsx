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

  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=_PcVFcZsvxacQ7I_ydTAZmYD8qs6g5NheuwuiBnQ7bg&search?query=sunny`;

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
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-800'>
      <div className='rounded-3xl border-2 border-gray-900 bg-gray-700 p-6 text-gray-200 shadow-xl shadow-gray-900'>
        <h1 className='text mb-4 items-center justify-center border-b-2 border-green-600 pb-4 text-center text-4xl font-bold'>
          My Weather App
        </h1>
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
