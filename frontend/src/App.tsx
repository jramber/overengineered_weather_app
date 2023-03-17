import axios from "axios";
import React, { useState } from "react";
import Forecast from './components/Forecast/Forecast';
import { IForecastResponseElement } from './types/types';
// import reactLogo from "./assets/react.svg";
// import "./App.css";

const baseUrl = import.meta.env.VITE_AWS_IP;
const apiPort = import.meta.env.VITE_API_PORT;
const apiUrl = `http://${baseUrl}:${apiPort}`;
const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

interface weatherRes {
  weather_message: string,
  temperature: number,
  wind_speed: number,
  wind_direction: number
}

function App() {
  const [weather, setWeather] = useState(<div /> );
  const [forecastDays, setForecastDays] = useState([<div/>]);

  React.useEffect(() => {
    // default position -> madrid
    let lat = 40.4165;
    let lon = -3.70256;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      })
    }

    // instance.get(`/${lat}/${lon}`).then( res => {
    instance.get(`/`, {
      params: {
        lat: lat,
        lon: lon
      }
    }).then( res => {
      const data: weatherRes = res.data;
      const properties = <>
        <p>{data.weather_message}</p>
        <p>temperature: {data.temperature}</p>
        <p>Wind Speed: {data.wind_speed}</p>
        <p>Wind direction: {data.wind_direction}</p>
      </>;
      setWeather(properties);
    });

    instance.get('/forecast', {
      params: {
        lat: lat,
        lon: lon
      }
    }).then(response => {
      const data: IForecastResponseElement[] = response.data;
      let forecast: JSX.Element[] = [];
      for(let i = 0; i < data.length; i++) {
        forecast.push(<Forecast
          key={data[i].day}
          date={data[i].day}
          max_temp={data[i].max_temp}
          min_temp={data[i].min_temp}
          weather_code={data[i].weather_code}
        />)
      }
      setForecastDays(forecast);
    });
  }, [])


  return (
    <div className="App p-6 bg-slate-100">
      {weather}
      <br/>
      <div className="flex flex-col gap-2">
        {forecastDays}
      </div>
    </div>
  );
}

export default App;
