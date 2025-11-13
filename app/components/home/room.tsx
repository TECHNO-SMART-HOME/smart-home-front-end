import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import ClickRoom from './addDevice/clickRoom'


interface Room {
  id: string
  name: string
  devices: number
  image: any
}

export default function RoomScreen() {
  const [rooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Kitchen',
      devices: 2,
      image: require('../../../assets/resources/kitchen.png'),
    },
    {
      id: '2',
      name: 'Bedroom',
      devices: 4,
      image: require('../../../assets/resources/bedroom.png'),
    },
    {
      id: '3',
      name: 'Living Room',
      devices: 7,
      image: require('../../../assets/resources/livingroom.png'),
    },
    {
      id: '4',
      name: 'Study Room',
      devices: 3,
      image: require('../../../assets/resources/studyroom.png'),
    },
  ])

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isModalVisible, setModalVisible] = useState(false)

  const handleRoomDevice = (room: Room) => {
    setSelectedRoom(room)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedRoom(null)
  }

  const renderRoom = ({ item }: { item: Room }) => (
    <TouchableOpacity
      onPress={() => handleRoomDevice(item)}
      key={item.id}
      className="flex-1 rounded-2xl p-5 items-center"
      style={{
        backgroundColor: '#363333',
        flexBasis: '48%',
      }}
    >
      <View className="w-28 h-28 rounded-full overflow-hidden">
        <Image source={item.image} className="w-full h-full" resizeMode="cover" />
      </View>

      <Text className="text-lg font-bold text-white text-center">{item.name}</Text>
      <Text className="text-sm text-gray-400">{item.devices} devices</Text>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      {/* Main List */}
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
      />

      {/* Fullscreen Modal (excluding tab bar) */}
      <ClickRoom
        visible={isModalVisible}
        room={selectedRoom}
        onClose={() => setModalVisible(false)}
       />
    </View>
  )
}

const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 24,
    gap: 16,
    paddingBottom: 90, // leaves space for tab bar
  },
  row: {
    gap: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)', // semi-transparent backdrop
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: screenHeight - 90, // leave space for bottom tab bar
    backgroundColor: '#2C2C2C',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  roomTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    alignItems: 'center',
  },
  roomImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
  },
  deviceText: {
    color: '#ccc',
    fontSize: 16,
  },
})
