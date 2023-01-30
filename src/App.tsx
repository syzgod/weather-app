import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Checkbox from './components/Checkbox';
import WeatherCard from './components/WeatherCard';
import Geolocation from './components/Geolocation';

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [location, setLocation] = useState('dorfen');
  const [loading, setLoading] = useState(true);

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
    { label: 'Wind', value: 'wind', checked: false },
    { label: 'Wind direction', value: 'windDirection', checked: false },
    { label: 'Option 3', value: 'option3', checked: false },
  ];

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-sky-800 to-slate-900'>
      <div className='rounded-3xl border-2 border-gray-900 bg-transparent p-6 text-gray-200 shadow-xl shadow-gray-900 backdrop-blur-md'>
        <h1 className='text mb-4 items-center justify-center border-b-2 border-gray-200 pb-4 text-center text-4xl font-bold'>
          My Weather App
        </h1>
        {<Geolocation />}
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
              <Checkbox options={options} />
            </div>
          </div>
          {loading && <div>Loading...</div>}
          {!loading ? <WeatherCard weatherData={weatherData} /> : null}
        </form>
      </div>
    </div>
  );
}

export default App;
