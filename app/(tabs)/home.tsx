// Use SafeAreaView to automatically handle the status bar
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TopSection from "../components/home/topSection"
import Weather from '../components/home/weather'
import Room from '../components/home/room'
import Add from '../components/home/add'

const bgColor = "#1C1E22"
export default function home() {
  return (
    <SafeAreaView
      style={{ backgroundColor: bgColor, flex: 1 }}
      className='p-4'
    >
      <TopSection/>
      <Weather/>

      <View className='flex flex-row justify-between items-center mb-2'>
        <Text className='text-2xl font-bold text-white'>Your Rooms</Text>
        <Add/>
      </View>
      <Room/>
    </SafeAreaView>
  )
}

