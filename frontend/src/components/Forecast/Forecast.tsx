import { getWeatherIcon, getWeekDay, parseDate } from '../../helpers/helpers';
import { useEffect, useState } from 'react';

interface IForecast {
  date: string
  max_temp: number,
  min_temp: number,
  weather_code: number
}

export default function Forecast({ date, max_temp, min_temp, weather_code}: IForecast) {
  let [weekDay, setWeekday] = useState('');
  let [maxTemp, setMaxTemp] = useState(0);
  let [minTemp, setMinTemp] = useState(0);
  let [icon, setIcon] = useState(<div/>);

  useEffect(() => {
    const parsedDate: number[] = parseDate(date)
    let dateObj = new Date(parsedDate[0],parsedDate[1] - 1,parsedDate[2]);
    setWeekday(getWeekDay(dateObj.getDay()));
    setIcon(getWeatherIcon(weather_code));
    setMaxTemp(max_temp);
    setMinTemp(min_temp);
  }, [])

  return(
      <div className="grid grid-cols-weather grid-rows-1 gap-6 p-2">
      {weekDay}
      <div className="grid justify-center">
        {icon}
      </div>
      <div className="flex flex-row flex-nowrap justify-end items-center gap-2">
        {minTemp}º
        <div className="bg-slate-600 h-0.5 w-4"></div>
        {maxTemp}º
      </div>
    </div>
  )
}