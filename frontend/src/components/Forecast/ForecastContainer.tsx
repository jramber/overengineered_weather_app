import React from 'react';
import { IForecast } from '../../types/types';
import Forecast from './Forecast';

export default function ForecastContainer ({ forecasts }: {forecasts: IForecast[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-400 text-sm">Forecast (7 days)</p>
      <div className="flex flex-col gap-2">
        {forecasts?.map((forecast) => (
          <Forecast
            key={forecast.day}
            date={forecast.day}
            max_temp={forecast.max_temp}
            min_temp={forecast.min_temp}
            weather_code={forecast.weather_code}
          />
        ))}
      </div>
    </div>
  )
}
