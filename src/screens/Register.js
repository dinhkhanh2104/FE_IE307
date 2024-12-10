import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES } from '../constants/theme'
import InputField from '../components/InputField'
import { COLORS } from '../constants/theme'

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from '@expo/vector-icons/Fontisto';
import Button from '../components/Button'

const Register = ({ navigation }) => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const handleNavigateLogin = () => {
        navigation.navigate("Login")
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Create an</Text>
                <Text style={styles.headerText}>account</Text>
            </View>

            <View style={styles.inputField}>
                <InputField
                    icon={<FontAwesome6 name="user-large" size={24} color={COLORS.semiGray} />}
                    placeholder={"Username"}
                    isPassword={false}
                    value={username}
                    onChangeText={(value) => { setUsername(value) }}
                />
                <InputField
                    icon={<Fontisto name="locked" size={24} color={COLORS.semiGray} />}
                    placeholder={"Password"}
                    isPassword={true}
                    value={password}
                    onChangeText={(value) => { setPassword(value) }}
                />
                <InputField
                    icon={<Fontisto name="locked" size={24} color={COLORS.semiGray} />}
                    placeholder={"Confirm Password"}
                    isPassword={true}
                    value={confirmPassword}
                    onChangeText={(value) => { setConfirmPassword(value) }}
                />
            </View>

            <Text style={styles.policyText}>
                By clicking the <Text style={{ color: "#ff4b26" }}>Register</Text> button, you agree to the public offer
            </Text>

            <Button title={"Create Account"} />

            <View style={styles.thirdParty}>
                <Text style={[styles.text, { width: "100%", textAlign: "center" }]}>- Or continue with -</Text>
                <View style={styles.iconArea}>
                    <TouchableOpacity
                        style={styles.icon}
                    >
                        <Image
                            source={require("../../assets/images/google.png")}
                            style={styles.image}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.icon}
                    >
                        <Image
                            source={require("../../assets/images/apple.png")}
                            style={{ width: 36, height: 36 }}

                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.icon}
                    >
                        <Image
                            source={require("../../assets/images/facebook.png")}
                            style={{ width: 62, height: 62 }}
                        />
                    </TouchableOpacity>

                </View>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Text style={styles.text}>I already have an account</Text>
                    <TouchableOpacity onPress={handleNavigateLogin}>
                        <Text style={styles.textPrimary}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingBottom: 40,
        paddingHorizontal: 26,
    },
    header: {
        marginTop: 80,
    },
    headerText: {
        fontFamily: "Montserrat_700Bold",
        fontSize: SIZES.font36,
    },
    inputField: {
        marginTop: 40,
        flexDirection: "column",
        gap: 24,
        marginBottom: 20,
    },
    policyText: {
        color: "#676767",
        fontFamily: "Montserrat_400Regular",
        fontSize: SIZES.font14,
        textAlign: "left",
        marginBottom: 50,
        paddingLeft: 5,
    },
    image: {
        width: 60,
        height: 60,
    },
    thirdParty: {
        marginTop: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
    },
    iconArea: {
        flexDirection: "row",
        gap: 20,
    },
    icon: {
        borderColor: COLORS.primary,
        backgroundColor: "#FCF3F6",
        borderWidth: 1,
        width: 74,
        height: 74,
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 36,
        height: 36
    },
    text: {
        fontFamily: "Montserrat_500Medium",
        fontSize: SIZES.font14,
    },
    textPrimary: {
        fontFamily: "Montserrat_600SemiBold",
        fontSize: SIZES.font14,
        color: COLORS.primary,
        textDecorationLine: "underline",
    }
})