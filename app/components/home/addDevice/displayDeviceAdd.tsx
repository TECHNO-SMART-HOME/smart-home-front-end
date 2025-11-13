import { View, Text, TouchableOpacity, Image } from 'react-native' // Removed StyleSheet
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
// Removed: import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'

// Import the device type from AddNewDevice.tsx
import { NewDeviceItem } from './addNewDevice'

type DisplayDeviceAddProps = {
  currentRoom: string;
  device: NewDeviceItem
  onClose: () => void // Function to go back to the device list
  onAdd: () => void // Function to "add" the device and close the modal
}

export default function DisplayDeviceAdd({
  currentRoom,
  device,
  onClose,
  onAdd,
}: DisplayDeviceAddProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#222222]">
      {/* 1. Improved Close Button */}
      <View className="absolute top-16 right-6 z-10">
        <TouchableOpacity
          onPress={onClose}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
        >
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 2. Main Content Area */}
      <View className="flex-1 items-center justify-center p-8">
        {/* --- THIS IS THE CHANGE ---
          Replaced <LinearGradient> with a <View>
          We use Tailwind to create the circle, set the background color,
          and add a color-matched shadow.
        */}
        <View className="w-[280px] h-[280px] rounded-full bg-[#E87C53] items-center justify-center shadow-lg shadow-orange-500/40">
          <Image
            source={device.image}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>
        {/* --- END OF CHANGE --- */}

        {/* 3. Text & Info */}
        <Text className="text-white text-3xl font-bold mt-10 text-center">
          {device.name}
        </Text>
        <Text className="text-gray-400 text-base text-center mt-4">
          Add this device to your 
           <Text className="text-white font-bold">
                {' '}{currentRoom}{' '}
            </Text>
           to monitor for fire
          and smoke, and receive alerts on your phone.
        </Text>
      </View>

      {/* 4. Cohesive Call-to-Action (CTA) */}
      <View className="p-6 pt-0">
        <TouchableOpacity
          onPress={onAdd}
          className="bg-[#2BD429] rounded-full p-4 items-center"
        >
          <Text className="text-white text-lg font-bold">Add Device</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
