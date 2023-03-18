export interface IIcon {
  size: number;
  color: string;
}

export interface IForecast {
  day: string;
  max_temp: number;
  min_temp: number;
  weather_code: number;
}

export interface ICurrentWeather {
  weather_msg: string;
  weather_code: number;
  temp: number;
  max_temp: number;
  min_temp: number;
  apparent_temperature: number;
  precipitation_sum: number;
  wind_speed: number;
  wind_direction: number;
  sunrise: string;
  sunset: string;
  uv_index_max: number;
}

export interface IHourlyForecast {
  time: string;
  weather_code: number;
  temperature: number;
}

export interface IWeather extends ICurrentWeather {
  city: string;
  hour_forecast: IHourlyForecast[];
  days_forecast: IForecast[];
}
