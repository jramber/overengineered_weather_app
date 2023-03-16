const express = require('express');
const cors =    require('cors');
const axios =   require('axios');
const weatherCodes = require('./weatherCodes.js');

const port = 3001
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

app.get('/', (req, res) => {
  res.send('This application is under development');
})

app.get('/:lat/:lon', async (req, res) => {

  let weather_object = {}

  await instance.get('/forecast', {
    params: {
      latitude: 40.4165,
      longitude: -3.70256,
      current_weather: true
    }
  }).then( response => {
    // console.log(response.data);
    const weatherCode = response.data.current_weather.weathercode;
    weather_object.weather_message = weatherCodes.getWeatherMsg(weatherCode);;
    weather_object.temperature     = response.data.current_weather.temperature;
    weather_object.wind_speed      = response.data.current_weather.windspeed;
    weather_object.wind_direction  = response.data.current_weather.winddirection;
  })

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(weather_object));
  // res.send(`Your latitude is: ${req.params.lat}, and your longitude is: ${req.params.lon}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})