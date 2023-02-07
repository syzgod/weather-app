import { useState, useEffect, useRef, useReducer } from 'react';
import Checkbox from './components/Checkbox';
import WeatherCard from './components/WeatherCard';
import ApiContext from './store/api-context';
import { useGeolocated } from 'react-geolocated';
import { getPlaceHandle } from './services/weatherService';
import { getWeatherData } from './services/weatherService';
import { getLocations } from './services/weatherService';
import { checkboxReducer } from './reducers/checkbox-reducer';
import { CheckboxContext } from './store/checkbox-context';
import background from './assets/pictures/noaa-cthDc0hUM0o-unsplash.jpg';

function App() {
  const [weatherData, setWeatherData] = useState<any>([]);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [location, setLocation] = useState('London');
  const [loading, setLoading] = useState(true);

  const ref = useRef<HTMLInputElement>(null);

  // Getting geolocation to determine the user's current location

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  // setting Longitude and Latitude to state

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      setLat(coords.latitude);
      setLong(coords.longitude);
    }
  }, [coords, lat, long, isGeolocationAvailable, isGeolocationEnabled]);

  // getting location name(city) then setting 'location' state

  useEffect(() => {
    setLoading(true);
    if (lat && long) {
      getPlaceHandle(lat, long)
        .then((response: any) => {
          setLocation(response.data[0].name);
          console.log(location);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [lat, long]);

  // getting weather information at the location and getting multiple locations with the same name

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      getWeatherData(location)
        .then((response) => {
          setWeatherData(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
      getLocations(location).then((response) => {
        console.log(response);
      });
    }
  }, [location]);

  console.log(weatherData);
  console.log(location);

  // Getting location name from the form input

  const locationHandle = (e: React.FormEvent): void => {
    e.preventDefault();
    setLocation(ref.current!.value);
  };

  // Multiple checkbox options

  const [state, dispatch] = useReducer(checkboxReducer, {
    checkboxes: [
      { label: 'Wind', value: 'wind', checked: false },
      { label: 'Wind direction', value: 'windDirection', checked: false },
      { label: 'Wind gust', value: 'windGust', checked: false },
    ],
  });

  return (
    <div>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords && !loading ? (
        <ApiContext.Provider value={weatherData}>
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
            className='flex min-h-screen flex-col items-center justify-center'
          >
            <div className='flex flex-col items-center justify-center rounded-3xl border bg-transparent p-6 text-gray-200 shadow-md shadow-gray-800 backdrop-blur-md'>
              <h1 className='text mb-4 items-center justify-center border-b-2 border-gray-200 pb-4 text-center text-4xl font-bold'>
                My Weather App{' '}
                <div className='text-2xl'>Location: {location}</div>
              </h1>
              <hr />

              <div className='flex flex-col items-center justify-center text-lg'>
                <div>
                  <form action='' onSubmit={locationHandle}>
                    <input
                      ref={ref}
                      className='m-2 w-fit rounded-2xl border border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-gray-200 placeholder-gray-300 shadow-md shadow-gray-700 focus:outline-none focus:ring focus:ring-gray-300'
                      type='text'
                      name=''
                      id=''
                      placeholder='Enter location name'
                    />
                    <button
                      type='submit'
                      className='h-12 rounded-full border border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-center shadow-md shadow-gray-700 hover:bg-opacity-50'
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
      ) : (
        <div>Getting the location data&hellip; </div>
      )}
    </div>
  );
}

export default App;
