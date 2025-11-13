import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const bgColor = "#1C1E22";

type Category = "All" | "Plugs" | "Tracker" | "Sensors";

type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: ImageSourcePropType;
};

const categories: Category[] = ["All", "Plugs", "Tracker", "Sensors"];

const products: Product[] = [
  {
    id: "fire-sensor",
    name: "Fire Sensor",
    price: 799,
    category: "Sensors",
    image: require("../../assets/resources/fire-alarm-sensor.png"),
  },
  {
    id: "flood-sensor",
    name: "Smart Flood Sensor",
    price: 849,
    category: "Sensors",
    image: require("../../assets/resources/flood-sensor.png"),
  },
  {
    id: "smart-plug",
    name: "Smart Plug",
    price: 420,
    category: "Plugs",
    image: require("../../assets/resources/smart-plug.png"),
  },
  {
    id: "electricity-monitor",
    name: "Electricity Monitor",
    price: 664,
    category: "Tracker",
    image: require("../../assets/resources/electricity-monitor.png"),
  },
];

const formatPrice = (value: number) =>
  `₱ ${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredProducts = useMemo(() => {
    const text = searchQuery.trim().toLowerCase();
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch =
        text.length === 0 || product.name.toLowerCase().includes(text);
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <View style={styles.cardImageWrapper}>
        <Image source={item.image} style={styles.cardImage} />
      </View>
      <View style={styles.cardDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Discover</Text>

            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#9EA2A9" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#9EA2A9"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.categoryRow}>
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={styles.categoryButton}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isActive && styles.categoryTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                    <View
                      style={[
                        styles.categoryIndicator,
                        isActive && styles.categoryIndicatorActive,
                      ]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No devices found</Text>
            <Text style={styles.emptySubtitle}>
              Try a different category or search term.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: bgColor,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 24,
    paddingBottom: 12,
    textAlign: "center",
    alignSelf: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1E22",
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    alignItems: "center",
    flex: 1,
  },
  categoryText: {
    color: "#9EA2A9",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  categoryIndicator: {
    height: 3,
    width: "70%",
    borderRadius: 999,
    backgroundColor: "transparent",
  },
  categoryIndicatorActive: {
    backgroundColor: "#FFFFFF",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    borderRadius: 22,
    backgroundColor: "#888888",
    overflow: "hidden",
    marginBottom: 16,
  },
  cardImageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    height: 110,
  },
  cardImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  cardDetails: {
    backgroundColor: "#F2F2F2",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  productName: {
    color: "#1F1F1F",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
    flexWrap: "wrap",
  },
  productPrice: {
    color: "#707070",
    fontSize: 13,
  },
  emptyState: {
    marginTop: 32,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptySubtitle: {
    color: "#9EA2A9",
    fontSize: 14,
  },
});
