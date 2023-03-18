import React, { Suspense } from 'react';
import { request_weather } from './api/api.js';
import ForecastContainer from './components/Forecast/ForecastContainer';
import { IWeather } from './types/types';

// render-as-you-fetch
const dataReq = request_weather();

function App() {
  const data: IWeather = dataReq.read();
  console.log(data);

  return (
    <div className="App min-h-screen p-6 bg-slate-100 flex flex-col gap-2">
      {/*<Suspense fallback={<div>Loading...</div>}>
        {weather}
      </Suspense>*/}
      <br/>
      {/* HOURLY FORECAST */}
      <div className="gap-2 grid grid-flow-col overflow-x-auto overscroll-x-contain">
       <div className="bg-black w-32 h-32"></div>
        <div className="bg-black w-32 h-32"></div>
        <div className="bg-black w-32 h-32"></div>
      </div>

      {/* DAILY FORECAST */}
      <Suspense fallback={<div>Loading</div>}>
        <ForecastContainer forecasts={data.days_forecast}/>
      </Suspense>
    </div>
  );
}

export default App;
