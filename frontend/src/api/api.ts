import axios from 'axios';
import { getSuspender } from './suspender';

const baseUrl: string | undefined = process.env.VITE_AWS_IP;
const apiPort: string | undefined = process.env.VITE_API_PORT;
let apiUrl: string | undefined;
if (baseUrl === undefined || apiPort === undefined) apiUrl = undefined;
else apiUrl = `https://${baseUrl}:${apiPort}`;

const Axios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

interface ICoordinates {
  lat: number;
  lon: number;
}

const getCoords = async (): Promise<{ geoLat: number; geoLon: number }> => {
  return await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        geoLat: position.coords.latitude,
        geoLon: position.coords.longitude,
      });
    });
  });
};

const getCoordinates = async (): Promise<ICoordinates> => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  // default coordinates -> Madrid, Spain
  let lat = 40.4165;
  let lon = -3.70256;

  if (params.has('lat') && params.has('lon')) {
    lat = Number(params.get('lat'));
    lon = Number(params.get('lon'));
  } else if ('geolocation' in navigator) {
    const { geoLat, geoLon } = await getCoords();
    lat = geoLat;
    lon = geoLon;
  }
  return { lat, lon };
};

export function requestWeather(): { read: () => any } {
  const coordinatePromise = getCoordinates();
  const promise = coordinatePromise.then(async (res) => {
    const { lat, lon } = res;
    return await Axios.get('/', {
      params: {
        lat,
        lon,
      },
    }).then((response) => response.data);
  });

  return getSuspender(promise);
}
