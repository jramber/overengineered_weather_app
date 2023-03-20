import axios from 'axios';
import {
  Result,
  Ok,
  Err,
  IForecastRes,
  IForecast,
  IHourlyForecast, IHourlyForecastRes, IWeather, ICurrentWeatherReq, ICurrentWeather, ILocation, ILocationRes,
} from './types.js';
import { weatherCodes } from './weatherCodes.js';

const Axios = axios.create({
  baseURL: 'https://api.open-meteo.com/v1'
});

const AxiosCity = axios.create({
  baseURL: 'https://api.bigdatacloud.net'
});

const AxiosLocation = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1'
});

export const request_city_name = async (latitude:  string, longitude: string): Promise<Result<string, string>> => {
  let city: string | undefined;

  await AxiosCity.get('/data/reverse-geocode-client', {
    params: {
      latitude: latitude,
      longitude: longitude,
      localityLanguage: 'en'
    }
  }).then(response => {
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
    return Err('Could not request information about the location');
  return Ok(city);
}

const createWeatherObj = (data: ICurrentWeatherReq): ICurrentWeather => ({
  apparent_temperature: data.daily.apparent_temperature_max[0],
  max_temp:             data.daily.temperature_2m_max[0],
  min_temp:             data.daily.temperature_2m_min[0],
  precipitation_sum:    data.daily.precipitation_sum[0],
  sunrise:              data.daily.sunrise[0],
  sunset:               data.daily.sunset[0],
  temp:                 data.current_weather.temperature,
  uv_index_max:         data.daily.uv_index_max[0],
  weather_msg:          weatherCodes.get(data.current_weather.weathercode),
  weather_code:         data.current_weather.weathercode,
  wind_speed:           data.current_weather.windspeed,
  wind_direction:       data.current_weather.winddirection,
});

export const request_current_weather = async (latitude: string, longitude: string) => {
  let weather: ICurrentWeather | undefined;

  await Axios.get('/forecast', {
    params: {
      latitude: latitude,
      longitude: longitude,
      current_weather: true,
      timezone: 'GMT',
      forecast_days: 1,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max,apparent_temperature_max,sunrise,sunset'
    }
  }).then( response => {
    weather = createWeatherObj(response.data);
  }).catch(error => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

  if(weather === undefined)
    return Err('Bad request');
  return Ok(weather);
}

const createForecastObj = (day: string, max_temp: number, min_temp: number, weather_code: number): IForecast => ({
  day,
  max_temp,
  min_temp,
  weather_code
})

export const request_forecast = async (latitude: string, longitude: string): Promise<Result<IForecast[], string>> => {
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
    for(let i = 0; i < data.daily.time.length; i++) {
      forecast.push(createForecastObj(
        data.daily.time[i],
        data.daily.temperature_2m_max[i],
        data.daily.temperature_2m_min[i],
        data.daily.weathercode[i],
      ))
    }
  }).catch(error => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

  if(forecast.length == 0)
    return Err('Bad request');
  return Ok(forecast);
}

const createHourlyForecastObj = (time: string, temperature: number, weather_code: number): IHourlyForecast => ({
  time,
  temperature,
  weather_code
});

export const request_hourly_forecast = async (latitude: string, longitude: string): Promise<Result<IHourlyForecast[], string>> => {
  let hourly_forecast: IHourlyForecast[] = [];
  const now = new Date(Date.now());

  await Axios.get('/forecast', {
    params: {
      latitude: latitude,
      longitude: longitude,
      forecast_days: 2,
      hourly: 'temperature_2m,weathercode'
    }
  }).then(response => {
    const data: IHourlyForecastRes = response.data;
    for(let i = 0; i < data.hourly.time.length; i++) {
      const date = new Date(data.hourly.time[i])
      if(now.getDate() == date.getDate() && now.getHours() > date.getHours()) {
        continue;
      } else if(now.getDate() < date.getDate() && now.getHours() <= date.getHours()) {
        continue;
      }
      hourly_forecast.push(createHourlyForecastObj(
        data.hourly.time[i],
        data.hourly.temperature_2m[i],
        data.hourly.weathercode[i]
      ));
    }
  }).catch(error => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

  if(hourly_forecast.length == 0)
    return Err('Bad request');
  return Ok(hourly_forecast);
}

export const req_weather = async (latitude: string, longitude: string): Promise<Result<IWeather, string>> => {
  // request city name
  const cityNameResult: Result<string, string> =  await request_city_name(latitude, longitude);
  if(cityNameResult.ok == false)
    return Err(cityNameResult.err)
  const city_name = cityNameResult.data;

  // request information about the current weather
  const currentWeatherResult: Result<ICurrentWeather, string> = await request_current_weather(latitude, longitude);
  if(currentWeatherResult.ok == false)
    return Err(currentWeatherResult.err)
  const current_weather = currentWeatherResult.data;

  // request forecast for the next 7 days
  const forecastResult: Result<IForecast[], string> = await request_forecast(latitude, longitude);
  if(forecastResult.ok == false)
    return Err(forecastResult.err);
  const forecast = forecastResult.data;

  // request forecast for the nex 24 hours
  const hourlyForecastResult: Result<IHourlyForecast[], string> = await request_hourly_forecast(latitude, longitude);
  if(hourlyForecastResult.ok == false)
    return Err(hourlyForecastResult.err);
  const hourly_forecast = hourlyForecastResult.data;

  return Ok({
    city: city_name,
    ...current_weather,
    hour_forecast: hourly_forecast,
    days_forecast: forecast
  });
}

const createLocationObj = (name: string, country: string, latitude: number, longitude: number):ILocation => ({
    name,
    country,
    latitude,
    longitude
})

export const request_location_info = async (query: string): Promise<Result<ILocation[], string>> => {
  let locations: ILocation[] = [];
  let err: string | undefined;

  await AxiosLocation.get('/search', {
    params: {
      name: query
    }
  }).then(response => {
    const data: ILocationRes = response.data;
    if(data.results === undefined) {
      err = 'The location provided do not match any real location.'
      return;
    }

    for(let i = 0; i < data.results.length; i++) {
      locations.push(createLocationObj(
        data.results[i].name,
        data.results[i].country,
        data.results[i].latitude,
        data.results[i].longitude
      ));
    }
  }).catch(error => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });;

  if(err !== undefined)     return Err(err);
  if(locations.length == 0) return Err('No results for the provided location');
  return Ok(locations);
}
