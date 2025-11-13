import { View, Text, TouchableOpacity, Image, Modal, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import CurrentDevice from './currentDevice'

interface Room {
  id: string
  name: string
  devices: number
  image: any
}

interface ClickRoomProps {
  visible: boolean
  room: Room | null
  onClose: () => void
}

export default function ClickRoom({ visible, room, onClose }: ClickRoomProps) {
  const screenHeight = Dimensions.get('window').height

  if (!room) return null

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <View className="flex-1 justify-end bg-black/80">
        {/* Modal content */}
        <View
          className="bg-[#2C2C2C] rounded-t-3xl p-5"
          style={{ height: screenHeight - 90 }}
        >
          {/* Header */}
          <View className="flex-row items-center mb-5">
            <TouchableOpacity
                className='flex flex-row justify-center items-center gap-x-2'
             onPress={onClose}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text className="text-white text-2xl mr-3">Back</Text>
            </TouchableOpacity>
          </View>

          {/* Modal Body */}
          <View className="items-center mb-2">
            <Image
              source={room.image}
              className="w-44 h-44 rounded-full mb-5"
              resizeMode="cover"
            />
            <Text className="text-white text-3xl font-bold">{room.name}</Text>
            <Text className="text-gray-400 text-base">
              {room.devices} Connected Devices
            </Text>
          </View>
          <CurrentDevice room={room.name}/>

        </View>
      </View>
    </Modal>
  )
}
