import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';
const router = express.Router();

import { req_weather } from './weather/functions.js';
import { IWeather, Result } from './weather/types.js';

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
  // check if the request has the required parameters
  if(!req.query.hasOwnProperty('lat') || !req.query.hasOwnProperty('lon')) {
    res.status(400);
    res.send('Request missing latitude or longitude parameters');
    return;
  }

  const weatherResult: Result<IWeather, string> = await req_weather(req.query.lat, req.query.lon);
  if(weatherResult.ok == false){
    res.status(400);
    res.send(weatherResult.err);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(weatherResult.data));
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