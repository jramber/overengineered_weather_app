import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';
const router = express.Router();

import { ILocation, req_weather, request_location_info } from './weather/functions.js';
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

app.get('/', async (req, res) => {
  // check if the request has the required parameters
  if(!req.query.hasOwnProperty('lat') || !req.query.hasOwnProperty('lon')) {
    res.status(400);
    res.send('Request missing latitude or longitude parameters');
    return;
  }

  // request weather information
  const weatherResult: Result<IWeather, string> = await req_weather(req.query.lat, req.query.lon);
  if(weatherResult.ok == false){
    res.status(400);
    res.send(weatherResult.err);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(weatherResult.data));
});

app.get('/search', async (req, res) => {
  if(!req.query.hasOwnProperty('q')){
    res.status(400);
    res.send('Request missing query parameter');
    return;
  }

  const query = req.query.q;
  // if the query has less than 2 chars or more than 99 return 400 status
  if(query.length < 2 || query.length > 99) {
    res.status(400);
    res.send('Incorrect query parameter');
    return;
  }
  // request location's information -> name, country
  const locations: Result<ILocation[], string> = await request_location_info(query);
  if(locations.ok == false){
    res.status(400);
    res.send(locations.err);
    return;
  }
  // return information
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(locations.data));
})

// app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});