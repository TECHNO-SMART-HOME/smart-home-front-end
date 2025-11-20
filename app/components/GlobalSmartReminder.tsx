import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNotificationSettings } from '../../src/context/NotificationSettingsContext'

const REMINDER_INTERVAL_MS = 60000 // 60 seconds between reminders

const reminders = [
  'Check the stove before sleeping.',
  'Close the LPG tank valve after cooking.',
  "Don't charge your phone on the bed overnight.",
  'Turn off lights when no one is in the room.',
  "Unplug gadgets once they're fully charged.",
  'Avoid plugging too many appliances into one extension cord.',
  "Don't leave the refrigerator door slightly open.",
  'Make sure all faucets are fully closed before going to bed.',
]

export default function GlobalSmartReminder() {
  const { reminderEnabled } = useNotificationSettings()
  const [visible, setVisible] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [pausedUntil, setPausedUntil] = useState<number | null>(null)

  const tips = useMemo(() => reminders, [])

  const showNextReminder = useCallback(() => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length)
    setVisible(true)
  }, [tips.length])

  useEffect(() => {
    if (!reminderEnabled) {
      setVisible(false)
      setPausedUntil(null)
      return
    }

    if (visible) {
      return
    }

    const now = Date.now()
    const wait = pausedUntil && pausedUntil > now ? pausedUntil - now : 0

    const timer = setTimeout(() => {
      showNextReminder()
    }, wait)

    return () => clearTimeout(timer)
  }, [reminderEnabled, pausedUntil, showNextReminder, visible])

  const handleDismiss = () => {
    setVisible(false)
    setPausedUntil(Date.now() + REMINDER_INTERVAL_MS)
  }

  if (!reminderEnabled || !visible) {
    return null
  }

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <View style={styles.modal}>
        <View style={styles.iconWrapper}>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={32} color="#FFD166" />
        </View>
        <Text style={styles.title}>Smart Reminder</Text>
        <Text style={styles.tip}>{tips[currentTipIndex]}</Text>

        <TouchableOpacity style={styles.button} onPress={handleDismiss}>
          <Text style={styles.buttonText}>OK, GOT IT</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modal: {
    width: '90%',
    backgroundColor: '#1F232A',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,209,102,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  tip: {
    color: '#D1D5DB',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFD166',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 26,
  },
  buttonText: {
    color: '#1B1B1F',
    fontWeight: '700',
    fontSize: 14,
  },
})
