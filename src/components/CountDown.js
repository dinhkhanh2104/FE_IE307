import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native' 

const CountDown = ({ isButton = false }) => {
    const initialTime = 22 * 60 * 60 + 55 * 60 + 20;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    const navigation = useNavigation();

    return (
        <View style={styles.dealArea}>
            <View style={styles.dealWrapper}>
                <Text style={styles.dealText}>Deal of the day</Text>
                <View style={styles.dealTime}>
                    <Icon name='alarm' type='MaterialCommunityIcons' size={24} color={COLORS.white} />
                    <Text style={{ color: COLORS.white }}>
                        {`${hours}h ${minutes}m ${seconds}s remaining`}
                    </Text>
                </View>
            </View>

            {isButton && (
                <TouchableOpacity style={styles.dealButton} onPress={() => { navigation.navigate("SaleNavigator") }}>
                    <Text style={styles.dealTextButton}>View all </Text>
                    <Icon name='arrowright' type='antdesign' color={COLORS.white} />
                </TouchableOpacity>
            )}

        </View>
    )
}

export default CountDown

const styles = StyleSheet.create({
    dealArea: {
        marginBottom: 10,
        backgroundColor: "#4392F9",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        justifyContent: "space-between",
        // alignItems: "center",
        flexDirection: "row"
        // width: "100%",
    },
    dealText: {
        color: COLORS.white,
        fontFamily: "Montserrat_500Medium",
        fontSize: SIZES.font16,
    },
    dealWrapper: {
        gap: 6
    },
    dealTime: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    dealButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 6,
        paddingHorizontal: 12,

    },
    dealTextButton: {
        color: COLORS.white,
        fontSize: SIZES.font14,
        fontFamily: "Montserrat_600SemiBold"
    },
})