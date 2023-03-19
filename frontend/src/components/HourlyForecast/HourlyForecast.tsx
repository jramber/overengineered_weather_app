import React from 'react';
import { IHourlyForecast } from '../../types/types';
import { getWeatherIcon } from '../../helpers/helpers';

export default function HourlyForecast ({ time, weather_code, temperature }: IHourlyForecast) {
  const date = new Date(time);
  const hours = date.getHours();
  const icon = getWeatherIcon(weather_code);

  return (
    <div className="flex flex-col gap-2 items-center p-2">
      {temperature}º
      {icon}
      {hours}
    </div>
  )
}