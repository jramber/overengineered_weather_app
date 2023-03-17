import axios from 'axios';
import {
  Result,
  Ok,
  Err,
  IForecastRes,
  IForecast,
  ITodayWeather,
  ITodayWeatherReq
} from './types.js';
import { weatherCodes } from './weatherCodes.js';

const Axios = axios.create({
  baseURL: 'https://api.open-meteo.com/v1'
});

export const request_forecast = async (latitude, longitude) => {
  let forecast: IForecast[] = [];
  await Axios.get('forecast', {
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
        day: data.daily.time[i],
        max_temp: data.daily.temperature_2m_max[i],
        min_temp: data.daily.temperature_2m_min[i],
        weather_code:  data.daily.weathercode[i]
      });
    }
  });
  return forecast;
}

export const request_todays_weather = async (latitude: string, longitude: string): Promise<Result<ITodayWeather, string>> => {

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
      precipitation_sum: data.daily.precipitation_sum[0],
      wind_direction:    data.current_weather.winddirection,
      wind_speed:        data.current_weather.windspeed,
      temp:              data.current_weather.temperature,
      max_temp:          data.daily.temperature_2m_max[0],
      min_temp:          data.daily.temperature_2m_min[0]
    }
  })

  if(weather === undefined)
    return Err('Bad request');
  return Ok(weather);
}
