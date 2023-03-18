export type Result<T, E = undefined> =
  { ok: true, data: T}
  | { ok: false, err: E | undefined };
export const Ok = <T>(data: T): Result<T, never> => ({ ok: true, data})
export const Err = <E>(err?: E): Result<never, E> => ({ ok: false, err })

// export type Result<Ok, Err> =
//     { result: 'ok',   data: Ok }
//   | { result: 'err', data: Err }

export interface IWeatherResponse {
  weather_message: string,
  temperature: number,
  wind_speed: number,
  wind_direction: number
}

export interface IForecastResDaily {
  time: string[],
  temperature_2m_max: number[],
  temperature_2m_min: number[],
  weathercode: number[]
}

export interface IForecastRes {
  latitude: number,
  longitude: number,
  generationtime_ms: number,
  utc_offset_seconds: number,
  timezone: string,
  timezone_abbreviation: string,
  elevation: number,
  daily_units: {
    time: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    weathercode: string
  },
  daily: IForecastResDaily
}

export interface IForecast {
  day: string,
  max_temp: number,
  min_temp: number,
  weather_code: number
}

export interface ICurrentWeatherReq {
  latitude: number,
  longitude: number,
  generationtime_ms: number,
  utc_offset_seconds: number,
  timezone: string,
  timezone_abbreviation: string,
  elevation: number
  current_weather: {
    temperature: number,
    windspeed: number,
    winddirection: number,
    weathercode: number,
    time: string
  },
  daily_units: {
    time: string,
    temperature_2m_max: string,
    temperature_2m_min: string,
    precipitation_sum: string,
    uv_index_max: string,
    apparent_temperature_max: string,
    sunrise: string,
    sunset: string
  },
  daily: {
    time: string[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_sum: number[],
    uv_index_max: number[],
    apparent_temperature_max: number[],
    sunrise: string[],
    sunset: string[]
  }
}

export interface ICurrentWeather {
  weather_msg: string,
  weather_code: number,
  temp: number,
  max_temp: number
  min_temp: number,
  apparent_temperature: number,
  precipitation_sum: number
  wind_speed: number,
  wind_direction: number,
  sunrise: string,
  sunset: string,
  uv_index_max: number
}

export interface IHourlyForecastRes {
  latitude: number,
  longitude: number,
  generationtime_ms: number,
  utc_offset_seconds: number,
  timezone: string,
  timezone_abbreviation: string,
  elevation: number,
  hourly_units: {
    time: string,
    temperature_2m: string,
    weathercode: string
  },
  hourly: {
    time: string[],
    temperature_2m: number[],
    weathercode: number[]
  }
}

export interface IHourlyForecast {
  time: string,
  weather_code: number,
  temperature: number
}

// extend
export interface IWeather extends ICurrentWeather {
  city: string,
  hour_forecast: IHourlyForecast[],
  days_forecast: IForecast[]
}

