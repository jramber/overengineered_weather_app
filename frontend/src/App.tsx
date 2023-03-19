import React, { Suspense } from 'react';
import { requestWeather } from './api/api.js';
import ForecastContainer from './components/Forecast/ForecastContainer';
import { IWeather } from './types/types';
import HourlyForecastContainer from './components/HourlyForecast/HourlyForecastContainer';
import GenericElement from './components/GenericElement/GenericElement';
import MainWeather from './components/MainWeather/MainWeather';
import HeaderColors from './components/HeaderColors/HeaderColors';

// render-as-you-fetch
const dataReq = requestWeather();

function App() {
  const data: IWeather = dataReq.read();
  console.log(data);

  return (
    <div className="App min-h-screen p-4 bg-gray-100 flex flex-col gap-2">
      <HeaderColors />
      <Suspense fallback={<div>Loading</div>}>
        <MainWeather
          city={data.city}
          temp={data.temp}
          max_temp={data.max_temp}
          min_temp={data.min_temp}
          weather_code={data.weather_code}
          weather_msg={data.weather_msg}
        />
      </Suspense>

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
      </div>
    </div>
  );
}

export default App;
