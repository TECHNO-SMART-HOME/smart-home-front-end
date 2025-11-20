type FetchWeatherParams = {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
};

export type CurrentWeather = {
  temp: number;
  humidity: number;
  location: string;
  description: string;
  icon: string;
  windSpeed?: number;
  cloudCover?: number;
  precipitationChance?: number;
  isHeavyRain: boolean;
  meetsFloodThresholds: boolean;
};

const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

type WeatherInfo = {
  icon: string;
  description: string;
};

const capitalizeWords = (text: string) =>
  text.replace(/\b\w/g, (char) => char.toUpperCase());

const mapConditionToDisplay = (
  conditionId?: number,
  fallbackDescription = "Weather",
): { icon: string; description: string } => {
  if (!conditionId) {
    return { icon: "weather-cloudy", description: fallbackDescription };
  }

  if (conditionId >= 200 && conditionId < 300) {
    return { icon: "weather-lightning", description: "Thunderstorm" };
  }
  if (conditionId >= 300 && conditionId < 400) {
    return { icon: "weather-rainy", description: "Drizzle" };
  }
  if (conditionId >= 500 && conditionId < 504) {
    return { icon: "weather-rainy", description: "Rainy" };
  }
  if (conditionId === 511) {
    return { icon: "weather-snowy-rainy", description: "Freezing Rain" };
  }
  if (conditionId >= 520 && conditionId < 600) {
    return { icon: "weather-pouring", description: "Rain Showers" };
  }
  if (conditionId >= 600 && conditionId < 700) {
    return { icon: "weather-snowy", description: "Snowy" };
  }
  if (conditionId >= 700 && conditionId < 800) {
    return { icon: "weather-fog", description: "Hazy" };
  }
  if (conditionId === 800) {
    return { icon: "weather-sunny", description: "Clear" };
  }
  if (conditionId === 801) {
    return { icon: "weather-partly-cloudy", description: "Mostly Sunny" };
  }
  if (conditionId === 802) {
    return { icon: "weather-partly-cloudy", description: "Partly Cloudy" };
  }
  if (conditionId === 803) {
    return { icon: "weather-cloudy", description: "Mostly Cloudy" };
  }
  if (conditionId === 804) {
    return { icon: "weather-cloudy", description: "Overcast" };
  }

  return { icon: "weather-cloudy", description: fallbackDescription };
};

const heavyRainWmoCodes = new Set([63, 65, 66, 67, 82, 95, 96, 99]);

const wmoCodeGroups: { codes: number[]; icon: string; description: string }[] = [
  { codes: [0], icon: "weather-sunny", description: "Clear" },
  { codes: [1], icon: "weather-sunny-alert", description: "Mostly Clear" },
  { codes: [2], icon: "weather-partly-cloudy", description: "Partly Cloudy" },
  { codes: [3], icon: "weather-cloudy", description: "Overcast" },
  { codes: [45, 48], icon: "weather-fog", description: "Foggy" },
  { codes: [51, 53, 55], icon: "weather-rainy", description: "Drizzle" },
  { codes: [56, 57], icon: "weather-snowy-rainy", description: "Freezing Drizzle" },
  { codes: [61, 63, 65], icon: "weather-pouring", description: "Rainy" },
  { codes: [66, 67], icon: "weather-snowy-rainy", description: "Freezing Rain" },
  { codes: [71, 73, 75], icon: "weather-snowy", description: "Snowy" },
  { codes: [77], icon: "weather-snowy-heavy", description: "Snow Grains" },
  { codes: [80, 81, 82], icon: "weather-pouring", description: "Rain Showers" },
  { codes: [85, 86], icon: "weather-snowy-heavy", description: "Snow Showers" },
  { codes: [95], icon: "weather-lightning", description: "Thunderstorm" },
  { codes: [96, 99], icon: "weather-hail", description: "Thunderstorm & Hail" },
];

const wmoWeatherMap: Record<number, WeatherInfo> = {};
wmoCodeGroups.forEach(({ codes, icon, description }) => {
  codes.forEach((code) => {
    wmoWeatherMap[code] = { icon, description };
  });
});

const fallbackWeatherInfo = (code?: number): WeatherInfo => {
  if (typeof code !== "number") {
    return { icon: "weather-cloudy", description: "Cloudy" };
  }
  return wmoWeatherMap[code] ?? { icon: "weather-cloudy", description: "Cloudy" };
};

const getNearestPrecipitationProbability = (weather: any): number | undefined => {
  const times: string[] | undefined = weather.hourly?.time;
  const probabilities: number[] | undefined =
    weather.hourly?.precipitation_probability;

  if (!Array.isArray(times) || !Array.isArray(probabilities) || !times.length) {
    return undefined;
  }

  const targetIso: string | undefined =
    weather.current?.time ?? weather.current_weather?.time ?? times[0];
  const target = targetIso ? Date.parse(targetIso) : Date.now();

  let closestIndex = 0;
  let closestDiff = Number.POSITIVE_INFINITY;

  times.forEach((timestamp, index) => {
    const diff = Math.abs(Date.parse(timestamp) - target);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = index;
    }
  });

  const value = probabilities[closestIndex];
  return typeof value === "number" ? Math.max(0, Math.round(value)) : undefined;
};

const fetchOpenMeteoPrecipitationChance = async (
  latitude: number,
  longitude: number,
): Promise<number | undefined> => {
  try {
    const url = `${OPEN_METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability`;
    const response = await fetch(url);
    if (!response.ok) {
      return undefined;
    }
    const data = await response.json();
    return getNearestPrecipitationProbability(data);
  } catch (error) {
    console.warn("Unable to fetch Open-Meteo precipitation probability", error);
    return undefined;
  }
};

async function fetchOpenMeteoWeather({
  latitude,
  longitude,
  city,
  country,
}: FetchWeatherParams): Promise<CurrentWeather> {
  const url = `${OPEN_METEO_BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,precipitation&hourly=precipitation_probability,cloud_cover&temperature_unit=celsius`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Weather service unavailable");
  }

  const weather = await response.json();
  const info = fallbackWeatherInfo(weather.current?.weather_code);

  const precipitationValue = weather.current?.precipitation ?? 0;
  const wmoCode = weather.current?.weather_code;

  const windSpeed =
    typeof weather.current?.wind_speed_10m === "number"
      ? Math.round(weather.current.wind_speed_10m)
      : undefined;

  const humidityValue = Math.round(weather.current?.relative_humidity_2m ?? 0);
  const precipitationChance = getNearestPrecipitationProbability(weather);
  const normalizedChance = precipitationChance ?? 0;

  const meetsFloodThresholds =
    normalizedChance >= 70 ||
    (windSpeed ?? 0) >= 60;

  return {
    temp: Math.round(weather.current?.temperature_2m ?? 0),
    humidity: humidityValue,
    location:
      city && country ? `${city}, ${country}` : "Current Location",
    description: info.description,
    icon: info.icon,
    windSpeed,
    cloudCover:
      typeof weather.hourly?.cloud_cover?.[0] === "number"
        ? Math.round(weather.hourly.cloud_cover[0])
        : undefined,
    precipitationChance: normalizedChance,
    isHeavyRain:
      heavyRainWmoCodes.has(wmoCode) || precipitationValue >= 10,
    meetsFloodThresholds,
  };
}

export async function fetchCurrentWeather({
  latitude,
  longitude,
  city,
  country,
}: FetchWeatherParams): Promise<CurrentWeather> {
  if (!API_KEY) {
    console.warn("OpenWeather API key missing. Falling back to Open-Meteo.");
    return fetchOpenMeteoWeather({ latitude, longitude, city, country });
  }

  try {
    const url = `${OPENWEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather service unavailable");
    }

    const data = await response.json();

    const condition = data.weather?.[0];
    const friendlyLocation =
      city && country
        ? `${city}, ${country}`
        : data.name
          ? `${data.name}${country ? `, ${country}` : ""}`
          : "Current Location";

    const { icon, description } = mapConditionToDisplay(
      condition?.id,
      capitalizeWords(condition?.description ?? "Weather"),
    );

    const rainVolume = typeof data.rain?.["1h"] === "number" ? data.rain["1h"] : 0;
    const cloudiness =
      typeof data.clouds?.all === "number" ? data.clouds.all : undefined;
    const heavyRainConditionIds = new Set([502, 503, 504, 522, 531]);

    const windSpeedValue =
      typeof data.wind?.speed === "number"
        ? Math.round(data.wind.speed)
        : undefined;

    let precipitationProbability =
      rainVolume > 0 ? Math.min(100, Math.round(rainVolume * 50)) : undefined;

    if (precipitationProbability === undefined) {
      precipitationProbability = await fetchOpenMeteoPrecipitationChance(
        latitude,
        longitude,
      );
    }

    const normalizedProbability = precipitationProbability ?? 0;

    const meetsFloodThresholds =
      normalizedProbability >= 70 ||
      (windSpeedValue ?? 0) >= 60;

    return {
      temp: Math.round(data.main?.temp ?? 0),
      humidity: Math.round(data.main?.humidity ?? 0),
      location: friendlyLocation,
      description,
      icon,
      windSpeed: windSpeedValue,
      cloudCover: cloudiness,
      precipitationChance: normalizedProbability,
      isHeavyRain:
        heavyRainConditionIds.has(condition?.id ?? -1) || rainVolume >= 10,
      meetsFloodThresholds,
    };
  } catch (error) {
    console.warn("OpenWeather request failed. Falling back to Open-Meteo.", error);
    return fetchOpenMeteoWeather({ latitude, longitude, city, country });
  }
}
