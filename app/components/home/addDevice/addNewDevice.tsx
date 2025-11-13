import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import React, { useState } from 'react' // 1. Import useState
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import DisplayDeviceAdd from './displayDeviceAdd' // 2. Import the new screen

// Define the type for a new device in the list
export type NewDeviceItem = { // Exporting type to be used by DisplayDeviceAdd
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
  room: string;
  onClose: () => void // Function passed from the parent to close the modal
}

export default function AddNewDevice({ room, onClose }: AddNewDeviceProps) {
  // 3. Add state to track which device is selected
  const [selectedDevice, setSelectedDevice] = useState<NewDeviceItem | null>(
    null,
  )

  // Renders a single row in the "Add" list
  const renderDeviceItem = ({ item }: { item: NewDeviceItem }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 border-b border-gray-700"
      activeOpacity={0.7}
      // 4. Set the selected device on press
      onPress={() => setSelectedDevice(item)}
    >
      <View className="flex-row items-center gap-4">
        {/* Use a smaller, contained image for the list */}
        <Image source={item.image} className="w-12 h-12" resizeMode="contain" />
        <Text className="text-white text-lg">{item.name}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#888" />
    </TouchableOpacity>
  )

  // 5. Check the state. If a device is selected, show the detail screen.
  if (selectedDevice) {
    return (
      // We wrap this in a SafeAreaView so it respects notches,
      // and match the dark color
      <SafeAreaView className="flex-1 bg-[#222222]">
        <DisplayDeviceAdd
            currentRoom = {room}
          device={selectedDevice}
          // The "X" button goes back to the list
          onClose={() => setSelectedDevice(null)}
          // The "Add" button closes the entire modal
          onAdd={() => {
            // Add your logic to save the device here
            // ...
            // Then close the modal
            onClose()
          }}
        />
      </SafeAreaView>
    )
  }

  // 6. If no device is selected, show the default list screen
  return (
    <SafeAreaView className="flex-1 rounded-3xl overflow-hidden bg-[#2C2C2C]">
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