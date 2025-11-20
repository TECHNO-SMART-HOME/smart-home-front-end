import { View, Text, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { useLocation } from '../../../src/context/LocationContext'
import { fetchCurrentWeather, CurrentWeather } from '../../../src/api/weather'

export default function Weather() {
  const [weatherData, setWeatherData] = useState<CurrentWeather | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { location } = useLocation()

  useEffect(() => {
    let isMounted = true

    const fetchWeather = async () => {
      try {
        setLoading(true)
        const latestWeather = await fetchCurrentWeather({
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
          country: location.country,
        })

        if (!isMounted) {
          return
        }

        setWeatherData(latestWeather)
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
              <MaterialCommunityIcons name={weatherData?.icon as any} size={48} color="#FFFFFF" />
            </View>

            {/* Weather Description + Location */}
            <View className="gap-2 flex-1">
              <Text className="text-xl font-bold text-white">
                {weatherData?.description}
              </Text>
              <Text className="text-sm text-gray-400">{weatherData?.location}</Text>
            </View>
          </View>

          {/* Right: Temperature */}
          <View className="items-end">
            <Text className="text-5xl font-bold text-white">{weatherData?.temp}</Text>
            <Text className="text-base text-gray-400">{'\u00B0C'}</Text>
          </View>
        </View>

        {/* Bottom Section: Weather Details Grid */}
        <View className="pt-4">
          <View className="flex-row justify-between items-center">
            {/* Sensible */}
            <View className="items-center gap-1.5 flex-1">
              <Text className="text-xl font-bold text-white">
                {weatherData?.temp}
                {'\u00B0C'}
              </Text>
              <Text className="text-sm text-gray-400 font-medium">Sensible</Text>
            </View>

            {/* Precipitation */}
            <View className="items-center gap-1.5 flex-1 border-gray-600 px-2">
              <Text className="text-xl font-bold text-white">
                {weatherData?.precipitationChance !== undefined
                  ? `${weatherData.precipitationChance}%`
                  : '0%'}
              </Text>
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
