import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

// 1. Define the props to match the new design's buttons
type Props = {
  onContinue: () => void   // For the green "Continue" button
  onBack: () => void        // For the "<" arrow
  onCloseModal: () => void // For the "X" button
}

// A helper component for the bullet points
const BulletPoint = ({ text }: { text: string }) => (
  <View className="flex-row items-start mb-4">
    {/* We use a serif font style to match the screenshot's text */}
    <Text className="text-black/80 text-lg mr-2" style={{ fontFamily: 'serif' }}>•</Text>
    <Text className="text-black/80 text-base flex-1" style={{ fontFamily: 'serif' }}>
      {text}
    </Text>
  </View>
)

export default function Confirmation({ onContinue, onBack, onCloseModal }: Props) {
  const DUMMY_TEXT =
    'DO NOT USE if it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'

  return (
    // Use SafeAreaView for a consistent dark background
    <SafeAreaView className="flex-1 bg-[#1C1E22]">
      
      {/* 1. Header */}
      <View className="flex-row items-center justify-between p-4">
        <TouchableOpacity
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={onCloseModal}
          className="h-10 w-10 items-center justify-center rounded-full bg-black/30"
        >
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 2. Content with scrolling */}
      <ScrollView
        className="flex-1 px-6 mt-4"
        contentContainerStyle={{ paddingBottom: 100 }} // Padding to not hide behind the button
      >
        {/* Card 1 */}
        <View className="bg-white/95 rounded-2xl p-6 mb-6">
          <Text className="text-black text-2xl font-bold mb-3" style={{ fontFamily: 'serif' }}>
            Before Using
          </Text>
          <Text className="text-black/70 text-base" style={{ fontFamily: 'serif' }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </Text>
        </View>

        {/* Card 2 */}
        <View className="bg-white/95 rounded-2xl p-6">
          <BulletPoint text={DUMMY_TEXT} />
          <BulletPoint text={DUMMY_TEXT} />
          <BulletPoint text={DUMMY_TEXT} />
        </View>
      </ScrollView>

      {/* 3. Floating Continue Button */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-transparent">
        <TouchableOpacity
          onPress={onContinue}
          className="bg-[#2BD429] rounded-full p-4 items-center"
        >
          <Text className="text-white text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}