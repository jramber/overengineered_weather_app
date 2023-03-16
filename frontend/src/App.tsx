import axios from "axios";
import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";

const baseUrl = import.meta.env.VITE_AWS_IP;
const apiPort = import.meta.env.VITE_API_PORT;
const apiUrl = `http://${baseUrl}:${apiPort}`;
const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true
});

function App() {
  const [msg, setMsg] = useState('');

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
      setMsg(res.data);
    });
  })

  return (
    <div className="App">
      <h1 className="text-3xl font-bold">Sunny</h1>
      <p className="">
        {msg}
      </p>
    </div>
  );
}

export default App;
