import React, { Suspense } from 'react';
import { requestWeather } from './api/api.js';
import ForecastContainer from './components/Forecast/ForecastContainer';
import { IWeather } from './types/types';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';

// render-as-you-fetch
const dataReq = requestWeather();

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
      <HourlyForecast />

      {/* DAILY FORECAST */}
      <Suspense fallback={<div>Loading</div>}>
        <ForecastContainer forecasts={data.days_forecast}/>
      </Suspense>
    </div>
  );
}

export default App;
