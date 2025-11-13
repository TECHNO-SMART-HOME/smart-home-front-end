import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function add() {

    const hanldeAdd = () => {
        console.log("Add")
    }
  return (
    <View>
        <TouchableOpacity
            onPress={() => hanldeAdd()}
            className="bg-[#363333] py-2 px-4 rounded-xl" 
        >
            <Text className="text-white text-lg font-semibold">+ Add</Text>
        </TouchableOpacity>
    </View>
  )
}