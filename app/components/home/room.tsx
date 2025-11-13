import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList, // 1. Import FlatList
  StyleSheet,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'

interface Room {
  id: string
  name: string
  devices: number
  image: any
}

export default function room() {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      name: 'Kitchen',
      devices: 2,
      image: require('../../../assets/images/kitchen.png'),
    },
    {
      id: '2',
      name: 'Bedroom',
      devices: 4,
      image: require('../../../assets/images/bedroom.png'),
    },
    {
      id: '3',
      name: 'Living Room',
      devices: 7,
      image: require('../../../assets/images/living-room.png'),
    },
    {
      id: '4',
      name: 'Study Room',
      devices: 3,
      image: require('../../../assets/images/study-room.png'),
    },
    {
      id: '5',
      name: 'Study Room', // This will now be rendered
      devices: 3,
      image: require('../../../assets/images/study-room.png'),
    },
    {
      id: '6',
      name: 'Study Room', // This will also be rendered
      devices: 3,
      image: require('../../../assets/images/study-room.png'),
    },
  ])

  // This function renders a single room card
  const renderRoom = ({ item }: { item: Room }) => (
    <TouchableOpacity
      key={item.id}
      // 'flex-1' makes it take up half the width
      className="flex-1 rounded-2xl p-5 items-center"
      style={{ 
            backgroundColor: '#363333', 
            flexBasis: '48%',

        }}
    >
      {/* Room Image Circle */}
      <View className="w-28 h-28 rounded-full overflow-hidden">
        <Image
          source={item.image}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Room Name */}
      <Text className="text-lg font-bold text-white text-center">
        {item.name}
      </Text>

      {/* Device Count */}
      <Text className="text-sm text-gray-400">
        {item.devices} devices
      </Text>
    </TouchableOpacity>
  )

  return (
    // 2. Replace ScrollView with FlatList
    <FlatList
      data={rooms} // The full array of rooms
      renderItem={renderRoom} // The function to render each item
      keyExtractor={(item) => item.id}
      numColumns={2} // This creates your 2-column grid
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={styles.row}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 24,
    gap: 16,
    paddingBottom: 90, 
  },
  row: {
    gap: 16,
  },
})