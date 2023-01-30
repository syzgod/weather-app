import axios from 'axios';
import { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';

const Geolocation = () => {
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState();

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

  const getPlaceHandle = (lat: number, long: number): void => {
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
    <div>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords && !loading ? (
        <div className='mb-4 flex flex-col items-center justify-center'>
          <div className='mb-3 flex w-fit flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-slate-400 bg-opacity-20 p-3'>
            <div>Current location name: {location}</div>
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
    </div>
  );
};

export default Geolocation;
