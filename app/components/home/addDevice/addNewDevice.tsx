import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

// Define the type for a new device in the list
type NewDeviceItem = {
  id: string
  name: string
  image: any // Use 'any' for require()
}

// Data for the list, based on your screenshot and assets
const NEW_DEVICE_DATA: NewDeviceItem[] = [
  {
    id: '1',
    name: 'Smart Fire Alarm',
    image: require('../../../../assets/resources/fire-alarm-sensor.png'),
  },
  {
    id: '2',
    name: 'Smart Flood Sensor',
    image: require('../../../../assets/resources/flood-sensor.png'),
  },
  {
    id: '3',
    name: 'Smart Plug',
    image: require('../../../../assets/resources/smart-plug.png'),
  },
  {
    id: '4',
    name: 'Electricity Usage Monitor',
    image: require('../../../../assets/resources/electricity-monitor.png'),
  },
]

// Define the component's props, including the 'onClose' function
type AddNewDeviceProps = {
  onClose: () => void // Function passed from the parent to close the modal
}

export default function AddNewDevice({ onClose }: AddNewDeviceProps) {
  // Renders a single row in the "Add" list
  const renderDeviceItem = ({ item }: { item: NewDeviceItem }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 border-b border-gray-700"
      activeOpacity={0.7}
      // You can add an onPress here to navigate to a specific device's setup
      // onPress={() => { /* Handle adding this specific device */ }}
    >
      <View className="flex-row items-center gap-4">
        {/* Use a smaller, contained image for the list */}
        <Image source={item.image} className="w-12 h-12" resizeMode="contain" />
        <Text className="text-white text-lg">{item.name}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#888" />
    </TouchableOpacity>
  )

  return (
    // Use SafeAreaView for a full-screen modal, give it a dark background
    <SafeAreaView className="flex-1 rounded-3xl overflow-hidden  bg-[#2C2C2C]">
      {/* Header matching your screenshot */}
      <View className="flex-row items-center p-4 border-b border-gray-600">
        <TouchableOpacity onPress={onClose} className="p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">
          Add a new device
        </Text>
      </View>

      {/* List of devices to add */}
      <FlatList
        data={NEW_DEVICE_DATA}
        renderItem={renderDeviceItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}