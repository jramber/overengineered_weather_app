import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';
const router = express.Router();

import { request_forecast, request_todays_weather } from './weather/functions.js';
import { weatherCodes } from './weather/weatherCodes.js';
import { IForecast, ITodayWeather, IWeatherResponse, Result } from './weather/types.js';

dotenv.config();

const PORT = process.env.PORT;
const app = express()

app.use(cors({
  // origin: `http://13.51.36.139/`
  origin: true,
  methods: ['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT', 'PATCH'],
  credentials: true
}));

router.get('/', async (req, res) => {
  // check if request has lat and lon parameters
  // ...
  const result: Result<ITodayWeather, string> = await request_todays_weather(req.query.lat, req.query.lon);
  if(result.ok == false){ // => !result.ok
    res.status(400);
    res.send(result.err);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result.data));
  }
});

router.get('/forecast', async (req, res) => {
  const forecast: IForecast[] = await request_forecast(req.query.lat, req.query.lon);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(forecast));
});


app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});