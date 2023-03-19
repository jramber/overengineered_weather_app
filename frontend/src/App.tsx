import React, { Suspense } from 'react';
import { requestWeather } from './api/api.js';
import ForecastContainer from './components/Forecast/ForecastContainer';
import { IWeather } from './types/types';
import HourlyForecastContainer from './components/HourlyForecast/HourlyForecastContainer';
import GenericElement from './components/GenericElement/GenericElement';

// render-as-you-fetch
const dataReq = requestWeather();

function App() {
  const data: IWeather = dataReq.read();
  console.log(data);

  return (
    <div className="App min-h-screen p-4 bg-slate-200 flex flex-col gap-2">
      {/*<Suspense fallback={<div>Loading...</div>}>
        {weather}
      </Suspense>*/}
      <br/>
      {/* HOURLY FORECAST */}

      <Suspense fallback={<div>Loading</div>}>
        <GenericElement
          title={"Hourly forecast"}
          component={<HourlyForecastContainer hourlyForecasts={data.hour_forecast} />}
        />
      </Suspense>

      {/* DAILY FORECAST */}
      <Suspense fallback={<div>Loading</div>}>
        <GenericElement
          title={"Forecast (7days)"}
          component={<ForecastContainer forecasts={data.days_forecast}/>}
        />
      </Suspense>

      <div className="flex flex-col gap-6">
        <div className="bg-slate-600 w-2/4 h-32" />
        <div className="bg-slate-600 w-2/4 h-32" />
        <div className="bg-slate-600 w-2/4 h-32" />
        <div className="bg-slate-600 w-2/4 h-32" />
      </div>
    </div>
  );
}

export default App;
