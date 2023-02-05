import { useState, useEffect, useRef, useReducer } from 'react';
import Checkbox from './components/Checkbox';
import WeatherCard from './components/WeatherCard';
import Geolocation from './components/Geolocation';
// import SearchForm from './components/SearchForm';
import { getWeatherData } from './services/weatherService';
import ApiContext from './store/api-context';
import { checkboxReducer } from './reducers/checkbox-reducer';
import { CheckboxContext } from './store/checkbox-context';

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

  const locationHandle = (e: React.FormEvent): void => {
    e.preventDefault();
    setLocation(ref.current!.value);
  };

  const [state, dispatch] = useReducer(checkboxReducer, {
    checkboxes: [
      { label: 'Wind', value: 'wind', checked: false },
      { label: 'Wind direction', value: 'windDirection', checked: false },
      { label: 'Wind gust', value: 'windGust', checked: false },
    ],
  });

  return (
    <ApiContext.Provider value={weatherData}>
      <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-sky-800 to-slate-900'>
        <div className='flex flex-col items-center justify-center rounded-3xl border-2 border-gray-900 bg-transparent p-6 text-gray-200 shadow-xl shadow-gray-900 backdrop-blur-md'>
          <h1 className='text mb-4 items-center justify-center border-b-2 border-gray-200 pb-4 text-center text-4xl font-bold'>
            My Weather App
          </h1>
          {<Geolocation />}
          <hr />

          <div className='flex flex-col items-center justify-center text-lg'>
            <div>
              <form action='' onSubmit={locationHandle}>
                <input
                  ref={ref}
                  className='m-2 w-fit rounded-2xl border border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-gray-200 placeholder-gray-400 shadow-md shadow-gray-900 focus:outline-none focus:ring focus:ring-gray-300'
                  type='text'
                  name=''
                  id=''
                  placeholder='Enter location name'
                />
                <button
                  type='submit'
                  className='h-12 rounded-full border border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-center shadow-md shadow-gray-900 hover:bg-opacity-50'
                >
                  Get location
                </button>
              </form>
            </div>
          </div>

          <CheckboxContext.Provider value={[state, dispatch]}>
            <Checkbox />
            {loading && <div>Loading...</div>}
            <WeatherCard />
          </CheckboxContext.Provider>
        </div>
      </div>
    </ApiContext.Provider>
  );
}

export default App;
