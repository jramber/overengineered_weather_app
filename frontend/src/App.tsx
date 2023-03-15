import axios from "axios";
import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const baseUrl = import.meta.env.VITE_HOST;
const apiPort = 3000;
const apiUrl = `http://${baseUrl}:${apiPort}`;

const instance = axios.create({
  baseURL: apiUrl,
});

function App() {

  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('');

  React.useEffect(() => {
    instance.get('/').then( res => {
      setMsg(res.data);
    });
  })

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => { setCount((count) => count + 1); }}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        {msg}
      </p>
    </div>
  );
}

export default App;
