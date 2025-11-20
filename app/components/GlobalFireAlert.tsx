import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState, useCallback } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { useNotificationSettings } from '../../src/context/NotificationSettingsContext';
import { fetchFireReadings } from '../../src/api/fireReadings';

const FIRE_ALERT_AVAILABLE =
  process.env.EXPO_PUBLIC_FIRE_ALERT_ENABLED === 'true';

export default function GlobalFireAlert() {
  const [visible, setVisible] = useState(false);
  const [lastAlertId, setLastAlertId] = useState<string | null>(null);
  const router = useRouter();
  const { fireAlertEnabled } = useNotificationSettings();
  const monitoringEnabled = FIRE_ALERT_AVAILABLE && fireAlertEnabled;

  const checkForFire = useCallback(async () => {
    if (!monitoringEnabled) return;

    try {
      const data = await fetchFireReadings();

      if (data && data.length > 0) {
        const latest = data[0];
        
        // 1. Check if Status is CRITICAL
        if (latest.status === "CRITICAL") {
            
            // 2. Time Check: Only alert if the data is "fresh" (less than 30 seconds old)
            // This prevents alerting for old fires from yesterday
            const readingTime = new Date(latest.timestamp).getTime();
            const now = new Date().getTime();
            const isFresh = (now - readingTime) < 30000; // 30 seconds

            // 3. ID Check: Don't show the same alert twice if user already closed it
            if (isFresh && latest._id !== lastAlertId) {
                setVisible(true);
                setLastAlertId(latest._id);
                Vibration.vibrate([500, 500, 500]); // Vibrate phone pattern
            }
        }
      }
    } catch (error) {
      // Silently fail if backend is offline (don't annoy user)
    }
  }, [monitoringEnabled, lastAlertId]);

  useEffect(() => {
    if (!monitoringEnabled) {
      setVisible(false);
      return;
    }
    const interval = setInterval(checkForFire, 3000); // Check every 3 seconds
    return () => clearInterval(interval);
  }, [checkForFire, monitoringEnabled]);

  useEffect(() => {
    if (!monitoringEnabled && visible) {
      setVisible(false);
    }
  }, [monitoringEnabled, visible]);

  const handleDismiss = () => {
    setVisible(false);
    // Optional: Navigate to Home to see details
    router.push("/(tabs)/home"); 
  };

  if (!FIRE_ALERT_AVAILABLE) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MaterialCommunityIcons name="fire-alert" size={60} color="#FF3B30" />
          
          <Text style={styles.modalTitle}>FIRE DETECTED!</Text>
          <Text style={styles.modalText}>
            The system has detected a critical fire hazard in Camera 01.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={handleDismiss}
          >
            <Text style={styles.textStyle}>ACKNOWLEDGE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)', // Dark background dimming
  },
  modalView: {
    margin: 20,
    backgroundColor: '#1C1E22',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#FF3B30'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginTop: 15,
    marginBottom: 10,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    elevation: 2,
    backgroundColor: '#FF3B30',
    width: 200,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  },
});
