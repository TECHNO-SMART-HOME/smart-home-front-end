import { View, Text, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { useLocation } from '../../context/LocationContext'

interface WeatherData {
  temp: number
  humidity: number
  condition: number
  location: string
  windSpeed?: number
  precipitation?: number
}

export default function weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { location } = useLocation()

  useEffect(() => {
    let isMounted = true

    const fetchWeather = async () => {
      try {
        setLoading(true)
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,precipitation&temperature_unit=celsius`
        )
        const weather = await weatherResponse.json()

        if (!isMounted) {
          return
        }

        setWeatherData({
          temp: Math.round(weather.current.temperature_2m),
          humidity: weather.current.relative_humidity_2m,
          condition: weather.current.weather_code,
          location: `${location.city}, ${location.country}`,
          windSpeed:
            typeof weather.current.wind_speed_10m === 'number'
              ? Math.round(weather.current.wind_speed_10m)
              : undefined,
          precipitation: weather.current.precipitation || 0,
        })
        setError(null)
      } catch (err) {
        if (isMounted) {
          setError(`Unable to fetch weather for ${location.city}`)
        }
        console.log(err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchWeather()

    return () => {
      isMounted = false
    }
  }, [location])

  const getWeatherIcon = (code: number | undefined): string => {
    if (!code) return 'weather-cloudy'
    if (code === 0 || code === 1) return 'weather-sunny'
    if (code === 2) return 'weather-partly-cloudy'
    if (code === 3) return 'weather-cloudy'
    if (code >= 45 && code <= 48) return 'weather-fog'
    if (code >= 51 && code <= 67) return 'weather-rainy'
    if (code >= 71 && code <= 85) return 'weather-snowy'
    if (code >= 80 && code <= 82) return 'weather-pouring'
    if (code >= 85 && code <= 86) return 'weather-snowy-heavy'
    if (code >= 80 && code <= 99) return 'weather-lightning'
    return 'weather-cloudy'
  }

  const getWeatherDescription = (code: number | undefined): string => {
    if (!code) return 'Cloudy'
    if (code === 0 || code === 1) return 'Sunny'
    if (code === 2) return 'Partly Cloudy'
    if (code === 3) return 'Cloudy'
    if (code >= 45 && code <= 48) return 'Foggy'
    if (code >= 51 && code <= 67) return 'Rainy'
    if (code >= 71 && code <= 85) return 'Snowy'
    if (code >= 80 && code <= 82) return 'Rainy'
    if (code >= 85 && code <= 86) return 'Snowy'
    if (code >= 80 && code <= 99) return 'Stormy'
    return 'Cloudy'
  }

  if (loading) {
    return (
      <View className="px-5 py-4 justify-center items-center">
        <ActivityIndicator size="large" color="#E16428" />
      </View>
    )
  }

  if (error) {
    return (
      <View className="px-5 py-4 justify-center items-center">
        <Text className="text-red-500 text-sm text-center">{error}</Text>
      </View>
    )
  }

  return (
    <View className="mt-3 py-4 gap-4">
      {/* Main Weather Card */}
      <View className="rounded-2xl p-6 gap-4" style={{ backgroundColor: '#363333' }}>
        {/* Top Section: Icon + Info + Temp */}
        <View className="flex-row items-center justify-between">
          {/* Left: Icon + Text Info */}
          <View className="flex-row items-center gap-4 flex-1">
            {/* Weather Icon */}
            <View className="bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full p-3 shadow-lg">
              <MaterialCommunityIcons
                name={getWeatherIcon(weatherData?.condition) as any}
                size={48}
                color="#FFFFFF"
              />
            </View>

            {/* Weather Description + Location */}
            <View className="gap-2 flex-1">
              <Text className="text-xl font-bold text-white">
                {getWeatherDescription(weatherData?.condition)}
              </Text>
              <Text className="text-sm text-gray-400">{weatherData?.location}</Text>
            </View>
          </View>

          {/* Right: Temperature */}
          <View className="items-end">
            <Text className="text-5xl font-bold text-white">{weatherData?.temp}</Text>
            <Text className="text-base text-gray-400">°C</Text>
          </View>
        </View>

        {/* Bottom Section: Weather Details Grid */}
        <View className="pt-4">
          <View className="flex-row justify-between items-center">
            {/* Sensible */}
            <View className="items-center gap-1.5 flex-1">
              <Text className="text-xl font-bold text-white">{weatherData?.temp}°C</Text>
              <Text className="text-sm text-gray-400 font-medium">Sensible</Text>
            </View>

            {/* Precipitation */}
            <View className="items-center gap-1.5 flex-1 border-gray-600 px-2">
              <Text className="text-xl font-bold text-white">{Math.round(weatherData?.precipitation || 0)}%</Text>
              <Text className="text-sm text-gray-400 font-medium">Precipitation</Text>
            </View>

            {/* Humidity */}
            <View className="items-center gap-1.5 flex-1">
              <Text className="text-xl font-bold text-white">{weatherData?.humidity}%</Text>
              <Text className="text-sm text-gray-400 font-medium">Humidity</Text>
            </View>

            {/* Wind */}
            <View className="items-center gap-1.5 flex-1 border-gray-600 pl-2">
              <Text className="text-xl font-bold text-white">
                {weatherData?.windSpeed !== undefined
                  ? `${weatherData.windSpeed}km/h`
                  : '--'}
              </Text>
              <Text className="text-sm text-gray-400 font-medium">Wind</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
