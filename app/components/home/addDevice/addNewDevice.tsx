import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import DisplayDeviceAdd from './displayDeviceAdd'
import Confirmation from './confirmation'
import ConnectWifi from './connectWifi' // 1. Import the new wifi screen

// Define the type for a new device in the list
export type NewDeviceItem = {
  id: string
  name: string
  image: any
}

// Data for the list
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

type AddNewDeviceProps = {
  room: string
  onClose: () => void
}

export default function AddNewDevice({ room, onClose }: AddNewDeviceProps) {
  // 2. Add 'wifi' to the possible steps
  const [step, setStep] = useState<'list' | 'detail' | 'confirm' | 'wifi'>('list')
  const [selectedDevice, setSelectedDevice] = useState<NewDeviceItem | null>(
    null,
  )

  const renderDeviceItem = ({ item }: { item: NewDeviceItem }) => (
    <TouchableOpacity
      className="flex-row items-center justify-between p-4 border-b border-gray-700"
      activeOpacity={0.7}
      onPress={() => {
        setSelectedDevice(item)
        setStep('detail')
      }}
    >
      <View className="flex-row items-center gap-4">
        <Image source={item.image} className="w-12 h-12" resizeMode="contain" />
        <Text className="text-white text-lg">{item.name}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#888" />
    </TouchableOpacity>
  )

  // 3. Add a new render block for the 'wifi' step
  // --- STEP 4: WIFI CONNECT ---
  if (step === 'wifi' && selectedDevice) {
    return (
      <ConnectWifi
        device={selectedDevice}
        wifiName="ISABELLA PISO WIFI" // You can make this dynamic
        onCloseModal={onClose}
      />
    )
  }

  // --- STEP 3: CONFIRMATION ---
  if (step === 'confirm' && selectedDevice) {
    return (
      <Confirmation
        // 4. THIS IS THE FIX: Set step to 'wifi'
        onContinue={() => {
          setStep('wifi')
          // You can start the "real" connection logic here
        }}
        onBack={() => setStep('detail')}
        onCloseModal={onClose}
      />
    )
  }

  // --- STEP 2: DEVICE DETAIL ---
  // Note: Your DisplayDeviceAdd prop is 'onAdd', which is correct
  // for the file you provided
  if (step === 'detail' && selectedDevice) {
    return (
      <SafeAreaView className="flex-1 bg-[#222222]">
        <DisplayDeviceAdd
          currentRoom={room}
          device={selectedDevice}
          onClose={() => setStep('list')}
          onAdd={() => {
            setStep('confirm')
          }}
        />
      </SafeAreaView>
    )
  }

  // --- STEP 1: DEVICE LIST (default) ---
  return (
    <SafeAreaView className="flex-1 rounded-3xl overflow-hidden bg-[#2C2C2C]">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-600">
        <TouchableOpacity onPress={onClose} className="p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">
          Add a new device
        </Text>
      </View>

      {/* List */}
      <FlatList
        data={NEW_DEVICE_DATA}
        renderItem={renderDeviceItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}