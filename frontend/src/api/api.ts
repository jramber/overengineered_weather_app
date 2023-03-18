import axios from 'axios';
import { getSuspender } from './suspender';

const baseUrl = import.meta.env.VITE_AWS_IP;
const apiPort = import.meta.env.VITE_API_PORT;
const apiUrl = `http://${baseUrl}:${apiPort}`;

const Axios = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

interface ICoordinates {
  lat: number,
  lon: number
}

const getCoords = (): Promise<{ geoLat: number, geoLon: number }> => {
  return new Promise((resolve, _) => {
    navigator.geolocation.getCurrentPosition(position => {
        resolve({
          geoLat: position.coords.latitude,
          geoLon: position.coords.longitude
        })
    });
  })
}

const getCoordinates = async (): Promise<ICoordinates> => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  // default coordinates -> Madrid, Spain
  let lat = 40.4165;
  let lon = -3.70256;

  if(params.has('lat') && params.has('lon')) {
    lat = Number(params.get('lat'));
    lon = Number(params.get('lon'));
  }else if ("geolocation" in navigator) {
    const { geoLat, geoLon } = await getCoords();
    lat = geoLat;
    lon = geoLon;
  }
  return { lat, lon };
}

export function coordinates () {
  const promise = getCoordinates()
  return getSuspender(promise);
}

export function request_weather () {
  const coordinate_promise = getCoordinates();
  const promise = coordinate_promise.then(res => {
    const { lat, lon } = res
    return Axios.get('/', {
      params: {
        lat: lat,
        lon: lon
      }
    }).then(response => response.data)
  })

  /*
  //.then(response => {
    // const data: IForecastResponseElement[] = response.data;
    // let forecast: JSX.Element[] = [];
    // for(let i = 0; i < data.length; i++) {
    //   forecast.push(<Forecast
    //     key={data[i].day}
    //     date={data[i].day}
    //     max_temp={data[i].max_temp}
    //     min_temp={data[i].min_temp}
    //     weather_code={data[i].weather_code}
    //   />)
    // }
    // setForecastDays(forecast);
  //});
   */
  return getSuspender(promise);
}
