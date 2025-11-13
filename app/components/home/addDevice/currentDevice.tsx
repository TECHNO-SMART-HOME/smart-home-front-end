import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

// 1. Define the types for your devices
type Device = {
  id: string
  name: string
  isOn: boolean
  // Using Ionicons as a placeholder, you can change to 'image: any'
  image: any
}

// This type allows the "Add" button to be part of the same grid
type DeviceGridItem = Device | { id: 'add' }

// 2. Mock Data - replace this with data from your component's props or API
const MOCK_DEVICES: DeviceGridItem[] = [
  {
    id: '1',
    name: 'Fire Sensor',
    isOn: false,
    image: require('../../../../assets/resources/fire-alarm-sensor.png'), // Example icon
  },
  {
    id: '2',
    name: 'Refrigerator',
    isOn: true,
    image: require('../../../../assets/resources/smart-plug.png'), // Example icon
  },
    {
    id: '3',
    name: 'Electricity Monitoring',
    isOn: true,
    image: require('../../../../assets/resources/electricity-monitor.png'), // Example icon
  },
  {
    id: '4',
    name: 'Flood Sensor',
    isOn: true,
    image: require('../../../../assets/resources/flood-sensor.png'), // Example icon
  },
  { id: 'add' }, // The "Add" button
]

// 3. A simple toggle switch styled with NativeWind to match your screenshot
const SimpleToggle = ({
  isOn,
  onPress,
}: {
  isOn: boolean
  onPress: () => void
}) => {
  return (
    <TouchableOpacity
      className={`w-[50px] h-7 rounded-full p-1 justify-center ${
        isOn ? 'bg-green-500' : 'bg-red-500'
      }`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* The white handle */}
      <View
        className={`w-5 h-5 bg-white rounded-full ${
          isOn ? 'self-end' : 'self-start'
        }`}
      />
    </TouchableOpacity>
  )
}

export default function CurrentDevice() {
  const [devices, setDevices] = useState<DeviceGridItem[]>(MOCK_DEVICES)

  // 4. Function to handle toggling a device's state
  const handleToggle = (id: string) => {
    setDevices((currentDevices) =>
      currentDevices.map((device) =>
        // Check if it's a real device (not 'add') and matches the ID
        device.id === id && 'isOn' in device
          ? { ...device, isOn: !device.isOn }
          : device,
      ),
    )
  }

  // 5. This function renders a single grid item (either a device or 'add' button)
  const renderItem = ({ item }: { item: DeviceGridItem }) => {
    // --- Render the "Add" button ---
    if (item.id === 'add') {
      return (
        <TouchableOpacity
          className="flex-1 items-center justify-center bg-[#363333] rounded-2xl p-5"
          // We use minHeight and flexBasis to ensure 2-column grid consistency
          style={{ minHeight: 170, flexBasis: '48%' }}
        >
          <Ionicons name="add" size={72} color="#555" />
        </TouchableOpacity>
      )
    }

    // --- Render a regular device card ---
    // We can safely cast 'item' to 'Device' here because we checked for 'add'
    const device = item as Device
    return (
      <TouchableOpacity
        className="flex-1 items-center bg-[#363333] rounded-2xl p-5"
        style={{ minHeight: 170, flexBasis: '48%' }}
        onPress={() => handleToggle(device.id)} // Allow toggling by pressing the card
        activeOpacity={0.7}
      >
        {/* Icon */}
        {/* <Ionicons name={device.image} size={48} color="white" /> */}
        <Image source={device.image} className="w-20 h-20" resizeMode="cover" />
        

        {/* Device Name */}
        <Text className="text-white text-lg font-bold mt-3 text-center">
          {device.name}
        </Text>

        {/* Status Text and Toggle */}
        <View className="flex-row items-center mt-auto pt-2 gap-2">
          <Text className="text-sm font-bold text-white">
            {device.isOn ? 'ON' : 'OFF'}
          </Text>
          <SimpleToggle
            isOn={device.isOn}
            onPress={() => handleToggle(device.id)}
          />
        </View>
      </TouchableOpacity>
    )
  }

  // 6. The FlatList component
  return (
    <FlatList
      data={devices}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      // Styles for the list container itself
      contentContainerStyle={{
        paddingTop: 24, // Add space above the grid
        paddingHorizontal: 4, // Align grid with modal padding
        gap: 16, // Vertical gap between rows
      }}
      // Style to add horizontal gap between columns
      columnWrapperStyle={{
        gap: 16,
      }}
    />
  )
}