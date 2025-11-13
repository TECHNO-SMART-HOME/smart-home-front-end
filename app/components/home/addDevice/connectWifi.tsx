import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

// Import the device type
import { NewDeviceItem } from './addNewDevice'

// Define the props it will receive
type Props = {
  device: NewDeviceItem
  wifiName: string
  onCloseModal: () => void // For the "X" button
}

export default function ConnectWifi({ device, wifiName, onCloseModal }: Props) {
  return (
    // Use SafeAreaView for a consistent dark background
    <SafeAreaView className="flex-1 bg-[#1C1E22]">
      {/* 1. Header with Close Button */}
      <View className="flex-row items-center justify-between p-4">
        <View className="w-10" />
        <TouchableOpacity
          onPress={onCloseModal}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
        >
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 2. Main Content */}
      <View className="flex-1 items-center justify-center p-8">
        <ActivityIndicator size="large" color="#FFFFFF" />
        
        <Ionicons name="wifi" size={64} color="white" className="my-8" />

        <Text className="text-white text-2xl font-bold">
          Connecting to
        </Text>
        <Text className="text-gray-400 text-xl font-bold mb-12">
          {wifiName}
        </Text>

        <Image
          source={device.image}
          className="w-48 h-48"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  )
}