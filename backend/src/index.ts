import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';

import { weatherCodes } from './helpers/weatherCodes.js';
import { IWeatherResponse} from './types/types.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express()

app.use(cors({
  // origin: `http://13.51.36.139/`
  origin: true,
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'PATCH'],
  credentials: true
}))

const instance = axios.create({
  baseURL: 'https://api.open-meteo.com/v1'
});

app.get('/', async (req, res) => {
  // check if request has lat and lon parameters
  // ...

  let weather_object: IWeatherResponse | undefined;

  await instance.get('/forecast', {
    params: {
      latitude: req.query.lat,
      longitude: req.query.lon,
      current_weather: true
    }
  }).then( response => {
    const weatherCode = response.data.current_weather.weathercode;
    weather_object = {
      weather_message: weatherCodes.get(weatherCode),
      temperature:     response.data.current_weather.temperature,
      wind_speed:      response.data.current_weather.windspeed,
      wind_direction:  response.data.current_weather.winddirection
    }
  })

  if (!weatherCodes) {
    res.sendStatus(404);
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(weather_object));
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});