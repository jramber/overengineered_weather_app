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

