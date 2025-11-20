import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocation } from '../../context/LocationContext'

const userName = "User"
export default function topSection() {
  const { location } = useLocation()

  return (
    <View
        className="flex gap-y-6"
    >
        <View
            className="flex flex-row justify-between"
        >
            <Ionicons name="menu" size={40} color="white" />
            <MaterialIcons name="account-circle" size={40} color="white" />
        </View>

        <View>
            <Text className="text-white text-bold text-3xl">Hello {userName}!</Text>
            <Text className="text-white text-2xl">Welcome to Smart Home</Text>
            <View className="flex flex-row items-center self-start bg-white/10 rounded-full px-4 py-2 mt-3">
              <Ionicons name="location-outline" size={18} color="#FFC107" />
              <Text
                className="text-white text-base ml-2"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {location.city}, {location.country}
              </Text>
            </View>
        </View>
    </View>
  )
}
