import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { fetchCurrentWeather } from '../../src/api/weather';
import { useLocation } from '../../src/context/LocationContext';
import { useNotificationSettings } from '../../src/context/NotificationSettingsContext';

const POLL_INTERVAL_MS = 180000; // 3 minutes

export default function GlobalFloodAlert() {
  const { floodAlertEnabled } = useNotificationSettings();
  const { location } = useLocation();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [acknowledgedAt, setAcknowledgedAt] = useState<number | null>(null);

  const checkForFloodRisk = useCallback(async () => {
    if (!floodAlertEnabled) {
      if (visible) {
        setVisible(false);
      }
      if (acknowledgedAt !== null) {
        setAcknowledgedAt(null);
      }
      return;
    }

    try {
      const weather = await fetchCurrentWeather({
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.city,
        country: location.country,
      });

      const shouldWarn = weather.isHeavyRain || weather.meetsFloodThresholds;

      if (shouldWarn) {
        // Only display if user hasn't acknowledged the current condition.
        if (!visible && acknowledgedAt === null) {
          setVisible(true);
          Vibration.vibrate([500, 300, 500]);
        }
      } else {
        // Reset acknowledgement when conditions clear so future alerts can show.
        if (visible) {
          setVisible(false);
        }
        if (acknowledgedAt !== null) {
          setAcknowledgedAt(null);
        }
      }
    } catch (error) {
      console.log('Flood alert weather check failed:', error);
    }
  }, [acknowledgedAt, floodAlertEnabled, location, visible]);

  useEffect(() => {
    checkForFloodRisk();
    const interval = setInterval(checkForFloodRisk, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [checkForFloodRisk]);

  useEffect(() => {
    if (!floodAlertEnabled && visible) {
      setVisible(false);
    }
  }, [floodAlertEnabled, visible]);

  const handleDismiss = () => {
    setVisible(false);
    setAcknowledgedAt(Date.now());
    router.replace('/(tabs)/home');
  };

  if (!floodAlertEnabled && !visible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MaterialCommunityIcons name="water-alert" size={60} color="#4FC3F7" />

          <Text style={styles.modalTitle}>HEAVY RAIN WARNING</Text>
          <Text style={styles.modalText}>
            Severe rainfall has been detected near {location.city}. Flood alert is active—please
            secure low-lying areas and monitor water levels.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleDismiss}>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
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
    borderColor: '#4FC3F7',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4FC3F7',
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 15,
  },
  button: {
    borderRadius: 10,
    padding: 14,
    elevation: 2,
    backgroundColor: '#4FC3F7',
    width: 200,
  },
  textStyle: {
    color: '#0F172A',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
