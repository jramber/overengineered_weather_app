import React from 'react';
import HourlyForecast from './HourlyForecast';
import { IHourlyForecast } from '../../types/types';

export default function HourlyForecastContainer ({ hourlyForecasts }: { hourlyForecasts: IHourlyForecast[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-gray-400 text-sm">Forecast by hours</p>
      <div className="flex flex-row flex-nowrap overflow-x-auto gap-6 py-2">
        {/*<div className="gap-4 grid grid-flow-col overflow-x-auto overscroll-x-contain">*/}
        {
          hourlyForecasts.map((forecast: IHourlyForecast) => (
            <HourlyForecast
              key={forecast.time}
              time={forecast.time}
              weather_code={forecast.weather_code}
              temperature={forecast.temperature}
            />
          ))
        }
      </div>
    </div>
  )
}
