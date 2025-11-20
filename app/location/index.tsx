import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocation } from "../../src/context/LocationContext";
import {
  fetchCountries,
  CountryOption,
} from "../../src/api/locations";

const bgColor = "#1C1E22";
const cardColor = "#4B4B4D";

export default function CountryListScreen() {
  const router = useRouter();
  const { location } = useLocation();
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadCountries = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchCountries();
      setCountries(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load countries. Check your connection and retry.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return countries;
    }
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [countries, searchQuery]);

  const handleCountryPress = (country: CountryOption) => {
    router.push({
      pathname: "/location/[countryCode]",
      params: {
        countryCode: country.code,
        countryName: encodeURIComponent(country.name),
      },
    });
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EC552B" />
          <Text style={styles.loadingText}>Fetching locations…</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={loadCountries}
            activeOpacity={0.8}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredCountries.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No countries match that search.</Text>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {filteredCountries.map((country) => {
          const isActive = country.name === location.country;
          return (
            <TouchableOpacity
              key={country.code}
              style={[styles.listItemSingle, isActive && styles.activeListItem]}
              onPress={() => handleCountryPress(country)}
              activeOpacity={0.85}
            >
              <View>
                <Text
                  style={[styles.listText, isActive && styles.activeListText]}
                  numberOfLines={1}
                >
                  {country.name}
                </Text>
                {isActive && (
                  <Text style={styles.currentLocationPill}>Currently Selected</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
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
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Country</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.card}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color="#BDBDBD" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search country"
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
    fontSize: 22,
    fontWeight: "600",
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerSpacer: {
    width: 44,
  },
  card: {
    flex: 1,
    backgroundColor: cardColor,
    borderRadius: 24,
    padding: 20,
  },
  listContent: {
    paddingBottom: 16,
    paddingTop: 4,
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
  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.15)",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listItemSingle: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.15)",
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
  listText: {
    color: "#EDEDED",
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  activeListText: {
    color: "#FFC107",
    fontWeight: "700",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
  },
  errorText: {
    color: "#FFADAD",
    textAlign: "center",
    fontSize: 15,
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
  currentLocationPill: {
    marginTop: 4,
    color: "#5DD66D",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    color: "#C3C3C3",
    fontSize: 14,
  },
});
