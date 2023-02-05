import { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { getPlaceHandle } from '../services/weatherService';

const Geolocation = () => {
  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();
  const [loading, setLoading] = useState(false);
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

  const handleGetPlaceHandleClick = (lat: number, long: number): void => {
    setLoading(true);
    getPlaceHandle(lat, long)
      .then((response: any) => {
        setLocation(response.data[0].name);
        console.log(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {!isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : coords && !loading ? (
        <div className='mb-4 flex flex-col items-center justify-center '>
          <div className='mb-3 flex w-fit flex-col items-center justify-center rounded-xl border border-gray-300 bg-slate-400 bg-opacity-20 p-3 shadow-md shadow-gray-900'>
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
            onClick={() =>
              handleGetPlaceHandleClick(coords.latitude, coords.longitude)
            }
            className='h-12 rounded-full border border-gray-300 bg-slate-400 bg-opacity-20 p-2 text-center shadow-md shadow-gray-900 hover:bg-opacity-50'
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
