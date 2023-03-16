import axios from "axios";
import React, { useState } from "react";
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

    instance.get(`/${lat}/${lon}`).then( res => {
      const data: weatherRes = res.data;
      const properties = <>
        <p>{data.weather_message}</p>
        <p>temperature: {data.temperature}</p>
        <p>Wind Speed: {data.wind_speed}</p>
        <p>Wind direction: {data.wind_direction}</p>
      </>;
      setWeather(properties);
    });
  })


  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Sunny</h1>
      {weather}
    </div>
  );
}

export default App;
