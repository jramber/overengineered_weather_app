import axios from 'axios';
import { IWeatherResponse, IForecastRes, IForecast } from '../types/types.js';


const Axios = axios.create({
  baseURL: 'https://api.open-meteo.com/v1'
});

export const request_forecast = async (latitude, longitude) => {
  // let weather: IWeatherResponse | undefined;
  let forecast: IForecast[] = [];

  await Axios.get('forecast', {
    params: {
      latitude: latitude,
      longitude: longitude,
      forecast_days: 7,
      timezone: 'GMT',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_mean'
    }
  }).then( response => {
    const data: IForecastRes = response.data;

    for(let i = 0; i < 7; i++) {
      forecast.push({
        day: data.daily.time[i],
        max_temp: data.daily.temperature_2m_max[i],
        min_temp: data.daily.temperature_2m_min[i],
        precipitation_probability: data.daily.precipitation_probability_mean[i]
      });
    }
  });

  return forecast;
}


