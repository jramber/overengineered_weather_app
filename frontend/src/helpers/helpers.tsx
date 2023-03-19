import SunIcon from '../components/Icons/SunIcon';
import PartlyCloudIcon from '../components/Icons/PartlyCloudyIcon';
import RainIcon from '../components/Icons/RainIcon';
import CloudIcon from '../components/Icons/CloudIcon';

export const getWeatherIcon = (weatherCode: number): JSX.Element => {
  if (weatherCode == 0) return <SunIcon size={20} color={"black"} />
  if (weatherCode == 1 || weatherCode == 2) return <PartlyCloudIcon size={20} color={"black"} />
  if (weatherCode >= 3 && weatherCode < 55) return <CloudIcon size={20} color={"black"} />
  if (weatherCode >= 55) return <RainIcon size={20} color={"black"} />
  return <div />
}

export const parseDate = (date: string): number[] => {
  let strs = date.split('-');
  let parsedDate = [];
  for(let i = 0; i < strs.length; i++) {
    parsedDate.push(Number(strs[i]));
  }
  return parsedDate;
}

export const getWeekDay = (day: number): string => {
  if (day === 0) return 'SUN';
  if (day === 1) return 'MON';
  if (day === 2) return 'TUE';
  if (day === 3) return 'WED';
  if (day === 4) return 'THU';
  if (day === 5) return 'FRI';
  if (day === 6) return 'SAT';
  return 'ERR';
}
