const weatherCodes = new Map([
  [0, "Clear sky"],
  [1, "Mainly clear"],
  [2, "Partly cloudy"],
  [3, "Overcast"],
  [45, "Fog"],
  [48, "Depositing rime fog"],
  [51, "Drizzle: Light intensity"],
  [53, "Drizzle: Moderate intensity"],
  [55, "Drizzle: Dense intensity"],
  [61, "Rain: Slight intensity"],
  [63, "Rain: Moderate intensity"],
  [65, "Rain: Heave intensity"],
  [66, "Freezing Rain: Light intensity"],
  [67, "Freezing Rain: Heavy intensity"],
  [71, "Snow fall: Slight intensity"],
  [73, "Snow fall: Moderate intensity"],
  [75, "Snow fall: Heavy intensity"],
  [77, "Snow grains"],
  [80, "Rain showers: Slight intensity"],
  [81, "Rain showers: Moderate intensity"],
  [82, "Rain showers: Violent intensity"],
  [85, "Snow showers slight"],
  [86, "Snow showers heavy"],
  [95, "Thunderstorm: Slight or moderate"],
  [96, "Thunderstorm with slight"],
  [99, "Heavy hail"]
]);

const getWeatherMsg = code => weatherCodes.get(code);

module.exports = { getWeatherMsg }