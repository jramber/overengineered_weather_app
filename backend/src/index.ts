import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';
const router = express.Router();

import { request_city_name, request_forecast, request_weather } from './weather/functions.js';
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
  if(!req.query.hasOwnProperty('lat') || !req.query.hasOwnProperty('lon')) {
    res.status(400);
    res.send('Request missing latitude or longitude parameters');
    return;
  }

  // Request city name
  const resultCity = await request_city_name(req.query.lat, req.query.lon);
  if(resultCity.ok == false) {
    res.status(400);
    res.send(resultCity.err);
    return;
  }
  console.log(resultCity.data);

  const resultWeather: Result<ITodayWeather, string> = await request_weather(req.query.lat, req.query.lon);
  if(resultWeather.ok == false){ // => !result.ok
    res.status(400);
    res.send(resultWeather.err);
    return;
  }
  console.log(resultWeather.data);

  const resultForecast: Result<IForecast[], string> = await request_forecast(req.query.lat, req.query.lon);
  if(resultForecast.ok == false){ // => !result.ok
    res.status(400);
    res.send(resultForecast.err);
    return;
  }
  console.log(resultForecast.data)

  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify(result.data));
});

router.get('/forecast', async (req, res) => {
  //const forecast: IForecast[] = await request_forecast(req.query.lat, req.query.lon);

  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify(forecast));
  res.end(JSON.stringify([]));
});

router.get('/search', async (req, res) => {
  // get the query
  // if the query has less than 2 chars return 400 status
  // retrieve location's information -> name, country
  // if request fail return empty object
  // return information
})

router.get('/:location', async (req, res) => {
  // get the query
  // if the query has less than 2 chars return 400 status
  // check for location's information
  // if location don't exist redirect to /
  // request all the information
  // return weather information
})


app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});