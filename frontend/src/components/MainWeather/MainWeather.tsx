import { IMainWeather } from '../../types/types';
import { getWeatherIcon } from '../../helpers/helpers';

export default function MainWeather ({ city, temp, max_temp, min_temp, weather_code, weather_msg}: IMainWeather) {
  const weather_icon = getWeatherIcon(weather_code);
  return (
    <div className="grid grid-rows-main grid-cols-main z-10">
      <span className="text-2xl">{city}</span>
      <div className="flex flex-col items-end">
        {weather_icon}
        {weather_msg}
      </div>
      <span className="text-superlarge">{temp}º</span>
      <div className="justify-self-end self-end">
        <p>max: {max_temp}º</p>
        <p>min: {min_temp}º</p>
      </div>
    </div>
  )
}