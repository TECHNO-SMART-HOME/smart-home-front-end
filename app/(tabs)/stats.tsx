import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';


export default function Stats() {
    const [activeTimePeriod, setActiveTimePeriod] = useState("Day");

    const currentKwh = 7.52;

    const mockSummaryData = [
        { label: "Today", value: "5.4", unit: "kWh" },
        { label: "Est. Month", value: "120", unit: "kWh" },
        { label: "This Week", value: "31", unit: "kWh" },
        { label: "Est. Bill", value: "₱650", unit: "" },
    ];

    const periods = ["Day", "Week", "Month", "Year"];

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.headerContainer}>
                    <Text style={styles.statTitle}>Statistics</Text>
                </View>


                <View style={styles.timeSelectorContainer}>
                    {periods.map((period) => {
                        const isActive = activeTimePeriod === period;
                        return (
                            <TouchableOpacity
                                key={period}
                                style={[styles.timeButton, isActive && styles.timeButtonActive]}
                                onPress={() => setActiveTimePeriod(period)}
                            >
                                <Text style={[styles.timeButtonText, isActive && styles.timeButtonTextActive, styles.unnaFontBold]}>
                                    {period}
                                </Text>
                                {isActive && <View style={styles.timeButtonUnderline} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                
                <View style={styles.summaryCard}>
                    <Text style={[styles.summaryTitle, styles.unnaFontRegular]}>
                        TOTAL ENERGY USAGE ({activeTimePeriod.toUpperCase()})
                    </Text>
                    
                    <View style={styles.usageRow}>
                        <Image
                            source={require('../../assets/resources/lightning.png')}
                            style={styles.lightningIcon}
                        />
                        <Text style={[styles.kwhValue, styles.unnaFontBold]}>
                            {currentKwh.toFixed(2)}
                        </Text>
                        <Text style={[styles.kwhUnit, styles.unnaFontRegular]}>KWh</Text>
                    </View>
                    
                    <Text style={[styles.costValue, styles.unnaFontRegular]}>
                        Total Cost: <Text style={[styles.costAmount, styles.unnaFontBold]}>
                            ${(currentKwh * 0.25).toFixed(2)}
                        </Text>
                    </Text>
                </View>


                <Text style={[styles.chartTitle, styles.unnaFontBold]}>Usage Trend</Text>
                
                <View style={styles.chartContainer}>
                    <Image
                        source={require('../../assets/resources/chart.png')}
                        style={styles.chartImage}
                        resizeMode="contain"
                    />
                    
                    <View style={styles.chartOverlay}>
                        <Text style={[styles.peakText, styles.unnaFontRegular]}>
                            Peak: 1.2 KWh @ 7PM
                        </Text>
                    </View>
                </View>


                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, styles.unnaFontBold]}>Summary</Text>
                    {mockSummaryData.map((data, index) => (
                        <View key={index} style={styles.summaryListItem}>
                            <Text style={[styles.summaryLabel, styles.unnaFontRegular]}>
                                {data.label}
                            </Text>
                            <Text style={[styles.summaryValue, styles.unnaFontBold]}>
                                {data.value}{data.unit}
                            </Text>
                        </View>
                    ))}
                </View>


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    unnaFontBold: {
        fontWeight: 'bold',
    },
    unnaFontRegular: {
        fontWeight: 'normal',
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#1C1E22",
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        alignItems: 'center',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statTitle: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 24,
        textAlign: "center",
        alignSelf: "center",
    },
    timeSelectorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: "#2A2A2A",
        borderRadius: 25,
        padding: 5,
        marginVertical: 10,
        overflow: 'hidden',
    },
    timeButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 20,
    },
    timeButtonActive: {
        backgroundColor: "#1C1E22",
    },
    timeButtonText: {
        color: "#8A8A8A",
        fontSize: 14,
    },
    timeButtonTextActive: {
        color: "#4CAF50",
    },
    timeButtonUnderline: {
        position: 'absolute',
        bottom: -5,
        height: 3,
        width: '50%',
        backgroundColor: "#4CAF50",
        borderRadius: 2,
    },
    summaryCard: {
        width: '100%',
        backgroundColor: "#2A2A2A",
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    summaryTitle: {
        color: "#8A8A8A",
        fontSize: 14,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    usageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    lightningIcon: {
        width: 30,
        height: 30,
        tintColor: "#A8E6CF",
        marginRight: 10,
    },
    kwhValue: {
        color: "#A8E6CF",
        fontSize: 60,
        marginRight: 8,
        lineHeight: 65,
    },
    kwhUnit: {
        color: "#A8E6CF",
        fontSize: 24,
        lineHeight: 40,
        opacity: 0.8,
    },
    costValue: {
        color: "#8A8A8A",
        fontSize: 16,
        marginTop: 10,
    },
    costAmount: {
        color: "#E0E0E0",
        fontWeight: 'bold',
    },
    chartTitle: {
        color: "#E0E0E0",
        fontSize: 20,
        marginBottom: 15,
        alignSelf: 'flex-start',
        width: '100%',
        fontWeight: 'bold',
    },
    chartContainer: {
        width: '100%',
        height: 250,
        backgroundColor: "#2A2A2A",
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#3A3A3A",
    },
    chartImage: {
        width: '95%',
        height: '95%',
    },
    chartOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 15,
    },
    peakText: {
        color: "#8A8A8A",
        fontSize: 12,
        marginBottom: 5,
    },
    sectionContainer: {
        width: '100%',
        paddingTop: 10,
    },
    sectionTitle: {
        color: "#E0E0E0",
        fontSize: 20,
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    summaryListItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#3A3A3A",
    },
    summaryLabel: {
        color: "#E0E0E0",
        fontSize: 16,
        flex: 1,
    },
    summaryValue: {
        fontSize: 16,
        color: "#A8E6CF",
        textAlign: 'right',
    },
});