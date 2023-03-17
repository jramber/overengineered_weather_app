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
    precipitation_probability_mean: string
  },
  daily: {
    time: string[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_probability_mean: number[]
  }
}

export interface IForecast {
  day: string,
  max_temp: number,
  min_temp: number,
  precipitation_probability: number
}

export interface ITodayWeatherReq {
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
    precipitation_sum: string
  },
  daily: {
    time: string[],
    temperature_2m_max: number[],
    temperature_2m_min: number[],
    precipitation_sum: number[]
  }
}

export interface ITodayWeather {
  weather_msg: string,
  temp: number,
  max_temp: number
  min_temp: number,
  precipitation_sum: number
  wind_speed: number,
  wind_direction: number
}
