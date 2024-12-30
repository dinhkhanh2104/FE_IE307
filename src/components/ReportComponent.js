import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {COLORS} from "../constants/theme"

const ReportComponent = ({ title, value, percentage, progress, progressColor = "black" }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statsRowWrapper}>
          <View style={styles.upArrow}>
            <MaterialCommunityIcons 
              name="arrow-top-right-thin" 
              size={18} 
              color="green" 
            />
          </View>
          <Text style={styles.percentageText}>{percentage}</Text>
        </View>
        <View style={styles.progressContainer}>
          <Svg height="45" width="45" viewBox="0 0 40 40">
            <Circle
              cx="20"
              cy="20"
              r="18"
              stroke="#e0e0e0"
              strokeWidth="4"
              fill="none"
            />
            <Circle
              cx="20"
              cy="20"
              r="18"
              stroke={progressColor}
              strokeWidth="4"
              strokeDasharray={`${progress * 2 * Math.PI * 18} ${2 * Math.PI * 18}`}
              strokeLinecap="round"
              fill="none"
              transform="rotate(-90 20 20)"
            />
          </Svg>
          <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
    </View>
  );
};

export default ReportComponent;

const styles = StyleSheet.create({
  card: {
    width: '49%',
    backgroundColor: '#fff', // Mặc định màu trắng
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 13,
    color: '#7a7a7a', // Mặc định màu xám
    marginBottom: 8,
    fontWeight: "500"
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000', // Mặc định màu đen
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
  },
  statsRowWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5
  },
  upArrow: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 990,
    backgroundColor: '#4caf5063', // Màu xanh lá nhạt cho nền mũi tên
  },
  percentageText: {
    color: "green", // Màu xanh lá cho phần trăm
    fontSize: 16,
    fontWeight: "500",
  },
  progressContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  progressText: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: '500',
    color: "black",
    top: 12,
    left: 11
  },
});
