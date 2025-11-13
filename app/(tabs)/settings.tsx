import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const bgColor = "#1C1E22";
const cardColor = "#4B4B4D";
const dividerColor = "rgba(255,255,255,0.12)";
const accent = "#EC552B";

const accountItems = [
  {
    id: "profile",
    label: "Profile Information",
    icon: <Ionicons name="person-circle-outline" size={22} color="#FFF" />,
  },
  {
    id: "security",
    label: "Security",
    icon: <Ionicons name="shield-checkmark-outline" size={22} color="#FFF" />,
  },
];

const preferenceItems = [
  {
    id: "language",
    label: "Language",
    icon: <MaterialCommunityIcons name="web" size={22} color="#FFF" />,
  },
  {
    id: "timezone",
    label: "Time Zone",
    icon: (
      <MaterialCommunityIcons
        name="clock-time-four-outline"
        size={22}
        color="#FFF"
      />
    ),
  },
  {
    id: "unit",
    label: "Unit",
    icon: <MaterialCommunityIcons name="scale-balance" size={22} color="#FFF" />,
  },
];

export default function Settings() {
  const [fireAlert, setFireAlert] = useState(true);
  const [floodAlert, setFloodAlert] = useState(false);
  const [reminder, setReminder] = useState(true);

  const renderCard = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text accessibilityRole="header" style={styles.screenTitle}>
            Settings
          </Text>

          {renderCard(
            "Account",
            accountItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.row,
                  index < accountItems.length - 1 && styles.rowDivider,
                ]}
                activeOpacity={0.7}
                accessibilityRole="button"
              >
                <View style={styles.rowLeft}>
                  {item.icon}
                  <Text style={styles.rowLabel}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#FFF" />
              </TouchableOpacity>
            )),
          )}

          {renderCard(
            "Notifications",
            <>
              <View style={[styles.row, styles.rowDivider]}>
                <View style={styles.rowLeft}>
                  <MaterialCommunityIcons name="fire" size={22} color="#FFF" />
                  <Text style={styles.rowLabel}>Fire Alert</Text>
                </View>
                <Switch
                  value={fireAlert}
                  onValueChange={setFireAlert}
                  thumbColor="#FFFFFF"
                  trackColor={{ false: "#767680", true: "#5DD66D" }}
                />
              </View>
              <View style={[styles.row, styles.rowDivider]}>
                <View style={styles.rowLeft}>
                  <MaterialCommunityIcons name="waves" size={22} color="#FFF" />
                  <Text style={styles.rowLabel}>Flood Alert</Text>
                </View>
                <Switch
                  value={floodAlert}
                  onValueChange={setFloodAlert}
                  thumbColor="#FFFFFF"
                  trackColor={{ false: "#767680", true: "#5DD66D" }}
                />
              </View>
              <View style={styles.row}>
                <View style={styles.rowLeft}>
                  <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={22}
                    color="#FFF"
                  />
                  <Text style={styles.rowLabel}>Smart Reminder</Text>
                </View>
                <Switch
                  value={reminder}
                  onValueChange={setReminder}
                  thumbColor="#FFFFFF"
                  trackColor={{ false: "#767680", true: "#5DD66D" }}
                />
              </View>
            </>,
          )}

          {renderCard(
            "Preferences",
            preferenceItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.row,
                  index < preferenceItems.length - 1 && styles.rowDivider,
                ]}
                activeOpacity={0.7}
                accessibilityRole="button"
              >
                <View style={styles.rowLeft}>
                  {item.icon}
                  <Text style={styles.rowLabel}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#FFF" />
              </TouchableOpacity>
            )),
          )}

          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Text style={styles.logoutText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: bgColor,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  screenTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
  },
  section: {
    marginBottom: 26,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    backgroundColor: cardColor,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: dividerColor,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: accent,
    paddingVertical: 14,
    paddingHorizontal: 80,
    borderRadius: 999,
    marginTop: 10,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
