import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLocation } from "../../src/context/LocationContext";

type CityListResponse = {
  error: boolean;
  msg: string;
  data?: string[];
};

const bgColor = "#1C1E22";
const cardColor = "#4B4B4D";

export default function CityPickerScreen() {
  const router = useRouter();
  const { countryCode, countryName } = useLocalSearchParams<{
    countryCode?: string;
    countryName?: string;
  }>();
  const decodedCountryName = useMemo(() => {
    if (!countryName) return "";
    try {
      return decodeURIComponent(countryName as string);
    } catch {
      return countryName as string;
    }
  }, [countryName]);

  const { location, setLocation } = useLocation();
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCities();
  }, [decodedCountryName]);

  const fetchCities = async () => {
    if (!decodedCountryName) {
      setError("Missing country name. Please go back and select again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ country: decodedCountryName }),
        },
      );
      const data: CityListResponse = await response.json();
      if (data.error || !data.data) {
        throw new Error(data.msg || "Unable to load cities");
      }
      const filtered = Array.from(new Set(data.data)).filter(Boolean);
      filtered.sort((a, b) => a.localeCompare(b));
      setCities(filtered);
    } catch (err) {
      console.error(err);
      setError("Unable to load cities. Check your network and retry.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCoordinates = async (city: string) => {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json${
        countryCode ? `&country=${countryCode}` : ""
      }`;
      const response = await fetch(url);
      const data = await response.json();
      const match = data.results?.[0];
      if (match) {
        return {
          latitude: match.latitude,
          longitude: match.longitude,
        };
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const handleCityPress = async (city: string) => {
    const coords = await fetchCoordinates(city);
    if (!coords) {
      Alert.alert(
        "Location not found",
        "Unable to determine coordinates for this city. Please try another.",
      );
      return;
    }
    setLocation({
      country: decodedCountryName || city,
      city,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setStatusMessage(`Location set to ${city}, ${decodedCountryName}`);
    setTimeout(() => setStatusMessage(null), 2500);
  };

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) {
      return cities;
    }
    return cities.filter((city) =>
      city.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [cities, searchQuery]);

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#EC552B" />
          <Text style={styles.infoText}>Loading cities…</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchCities}
            activeOpacity={0.85}
          >
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredCities.length === 0) {
      return (
        <View style={styles.centered}>
          <Text style={styles.infoText}>
            {cities.length === 0
              ? "This country does not have a published city list."
              : "No cities match that search."}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredCities.map((city) => {
          const isActive =
            city === location.city &&
            decodedCountryName.toLowerCase() === location.country.toLowerCase();
          return (
            <TouchableOpacity
              key={city}
              style={[styles.listItem, isActive && styles.activeListItem]}
              onPress={() => handleCityPress(city)}
              activeOpacity={0.85}
            >
              <Text
                style={[styles.cityText, isActive && styles.activeCityText]}
                numberOfLines={1}
              >
                {city}
              </Text>
              {isActive && (
                <Ionicons name="checkmark-circle" size={18} color="#5DD66D" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Cities</Text>
          <Text style={styles.headerSubtitle}>{decodedCountryName}</Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.homeButton}
          onPress={() => router.push("/(tabs)/settings")}
        >
          <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color="#BDBDBD" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city"
            placeholderTextColor="#8E8E8E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setSearchQuery("")}
            >
              <Ionicons name="close-circle" size={18} color="#8E8E8E" />
            </TouchableOpacity>
          )}
        </View>
        {statusMessage && (
          <View style={styles.statusPill}>
            <Ionicons name="checkmark-circle" size={16} color="#5DD66D" />
            <Text style={styles.statusText}>{statusMessage}</Text>
          </View>
        )}
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: bgColor,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#BDBDBD",
    fontSize: 12,
    textAlign: "center",
    marginTop: 2,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  homeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: cardColor,
    borderRadius: 24,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  listItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.18)",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeListItem: {
    borderWidth: 1,
    borderColor: "#FFC107",
    backgroundColor: "rgba(255,193,7,0.15)",
  },
  cityText: {
    color: "#FFFFFF",
    fontSize: 15,
    flex: 1,
    marginRight: 12,
  },
  activeCityText: {
    color: "#FFC107",
    fontWeight: "700",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  errorText: {
    color: "#FFADAD",
    textAlign: "center",
  },
  retryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#EC552B",
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(93,214,109,0.18)",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  statusText: {
    color: "#CFF7D6",
    fontSize: 13,
    fontWeight: "600",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },
});
