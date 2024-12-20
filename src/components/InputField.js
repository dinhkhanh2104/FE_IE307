import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants/theme';

import Feather from '@expo/vector-icons/Feather';

const InputField = ({ placeholder, isPassword, value, onChangeText, icon }) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View style={styles.inputFieldContainer}>
            <View style={styles.inputFieldWrapper}>
                {icon}
                <TextInput
                    style={styles.inputFieldText}
                    placeholder={placeholder}
                    placeholderTextColor={"#676767"}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword && !showPassword}
                    cursorColor={COLORS.semiGray}
                />
            </View>

            {isPassword && (
                <TouchableOpacity style={{}} onPress={() => setShowPassword(!showPassword)}>
                    <Feather
                        name={showPassword ? "eye-off" : "eye"}
                        size={24}
                        color={COLORS.semiGray}
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default InputField

const styles = StyleSheet.create({
    inputFieldContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 10,
        width: "100%",
        backgroundColor: COLORS.extraLightGray,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.lightGray,
        overflow: "hidden",
    },
    inputFieldWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        width: "80%",
    },
    inputFieldText: {
        fontSize: SIZES.font16,
        flex: 1,
        fontFamily: "Montserrat_500Medium",
    }
})