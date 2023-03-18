import axios from 'axios';
import {
  Result,
  Ok,
  Err,
  IForecastRes,
  IForecast,
  ITodayWeather,
  ITodayWeatherReq,
} from './types.js';
import { weatherCodes } from './weatherCodes.js';

const Axios = axios.create({
  baseURL: 'https://api.open-meteo.com/v1'
});

const AxiosCity = axios.create({
  baseURL: 'https://api.bigdatacloud.net'
})

export const request_forecast = async (latitude, longitude): Promise<Result<IForecast[], string>> => {
  let forecast: IForecast[] = [];
  await Axios.get('/forecast', {
    params: {
      latitude: latitude,
      longitude: longitude,
      forecast_days: 7,
      timezone: 'GMT',
      daily: 'temperature_2m_max,temperature_2m_min,weathercode'
    }
  }).then( response => {
    const data: IForecastRes = response.data;
    for(let i = 0; i < 7; i++) {
      forecast.push({
        day:           data.daily.time[i],
        max_temp:      data.daily.temperature_2m_max[i],
        min_temp:      data.daily.temperature_2m_min[i],
        weather_code:  data.daily.weathercode[i]
      });
    }
  });

  if(forecast.length == 0)
    return Err('Bad request');
  return Ok(forecast);
}

export const request_weather = async (latitude: string, longitude: string): Promise<Result<ITodayWeather, string>> => {
  let weather: ITodayWeather | undefined;

  await Axios.get('/forecast', {
    params: {
      latitude: latitude,
      longitude: longitude,
      current_weather: true,
      timezone: 'GMT',
      forecast_days: 1,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max,apparent_temperature_max'
    }
  }).then( response => {
    const data: ITodayWeatherReq = response.data;
    weather = {
      weather_msg:       weatherCodes.get(data.current_weather.weathercode),
      weather_code:      data.current_weather.weathercode,
      wind_direction:    data.current_weather.winddirection,
      wind_speed:        data.current_weather.windspeed,
      temp:              data.current_weather.temperature,
      precipitation_sum: data.daily.precipitation_sum[0],
      max_temp:          data.daily.temperature_2m_max[0],
      min_temp:          data.daily.temperature_2m_min[0]
    }
  })

  if(weather === undefined)
    return Err('Bad request');
  return Ok(weather);
}

export const request_city_name = async (latitude:  string, longitude: string): Promise<Result<string, string>> => {
  let city: string | undefined;

  await AxiosCity.get('/data/reverse-geocode-client', {
    params: {
      latitude: latitude,
      longitude: longitude,
      localityLanguage: 'en'
    }
  }).then(response => {
    // const data = response.data;
    city = response.data.city;
  }).catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

  if(city === undefined)
    return Err('Bad request');
  return Ok(city);
}
