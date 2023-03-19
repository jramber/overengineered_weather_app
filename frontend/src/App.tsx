import React, { Suspense } from 'react';
import { requestWeather } from './api/api.js';
import ForecastContainer from './components/Forecast/ForecastContainer';
import { IWeather } from './types/types';
import HourlyForecastContainer from './components/HourlyForecast/HourlyForecastContainer';
import GenericElement from './components/GenericElement/GenericElement';
import MainWeather from './components/MainWeather/MainWeather';
import HeaderColors from './components/HeaderColors/HeaderColors';
import AmbientTemp from './components/AmbientTemp/AmbientTemp';
import UVIndex from './components/UVIndex/UVIndex';
import Precipitation from './components/Precipitation/Precipitation';
import Wind from './components/Wind/Wind';

// render-as-you-fetch
const dataReq = requestWeather();

function App() {
  const data: IWeather = dataReq.read();
  console.log(data);

  return (
    <div className="App min-h-screen p-4 bg-gray-100
    flex flex-col gap-2
    md:grid md:grid-rows-2 md:grid-cols-2 md:gap-8
    ">
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

      <div className="row-span-2 flex flex-col gap-2 md:gap-8">
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
      </div>

      <div className="grid grid-rows-2 grid-cols-2 gap-4">
                                                       <AmbientTemp temperature={data.apparent_temperature} />
                                                       <UVIndex uvindex={data.uv_index_max} />
                                                       <Precipitation precipitation={data.precipitation_sum} />
                                                       {/*<Wind windSpeed={data.wind_speed} windDirection={data.wind_direction} />*/}
                                                       <Wind windSpeed={data.wind_speed} windDirection={300} />
                                                       </div>
    </div>
  );
}

export default App;
