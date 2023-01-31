import axios from 'axios';
import { useState, useEffect, useRef, FormEvent } from 'react';
import Checkbox from './components/Checkbox';
import WeatherCard from './components/WeatherCard';
import Geolocation from './components/Geolocation';
import SearchForm from './components/SearchForm';
import { getWeatherData } from './services/weatherService';
import ApiContext from './store/api-context';
import CheckboxContext from './store/checkbox-context';

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [location, setLocation] = useState('dorfen');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getWeatherData(location)
      .then((response) => {
        setWeatherData(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  const locationHandle = (): void => {
    setLocation(ref.current!.value);
  };

  const options = [
    { label: 'Wind', value: 'wind', checked: false },
    { label: 'Wind direction', value: 'windDirection', checked: false },
    { label: 'Option 3', value: 'option3', checked: false },
  ];

  return (
    <CheckboxContext.Provider value={options}>
      <ApiContext.Provider value={weatherData}>
        <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-sky-800 to-slate-900'>
          <div className='rounded-3xl border-2 border-gray-900 bg-transparent p-6 text-gray-200 shadow-xl shadow-gray-900 backdrop-blur-md'>
            <h1 className='text mb-4 items-center justify-center border-b-2 border-gray-200 pb-4 text-center text-4xl font-bold'>
              My Weather App
            </h1>
            {<Geolocation />}
            <hr />

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
                  onClick={locationHandle}
                >
                  Get location
                </button>
              </div>
            </div>

            <Checkbox options={options} />
            {loading && <div>Loading...</div>}
            <WeatherCard />
          </div>
        </div>
      </ApiContext.Provider>
    </CheckboxContext.Provider>
  );
}

export default App;
