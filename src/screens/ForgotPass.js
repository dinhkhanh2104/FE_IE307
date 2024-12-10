import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SIZES } from '../constants/theme'
import InputField from '../components/InputField'
import { COLORS } from '../constants/theme'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Button from '../components/Button'

const ForgotPass = ({navigation}) => {

    const [email, setEmail] = useState()

    const handleNavigateLogin = () => {
        navigation.navigate("Login")
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerText}>Forgot</Text>
                <Text style={styles.headerText}>password?</Text>
            </View>

            <View style={styles.inputField}>
                <InputField
                    icon={<MaterialCommunityIcons name="email" size={24} color={COLORS.semiGray} />}
                    placeholder={"Enter your email address"}
                    isPassword={false}
                    value={email}
                    onChangeText={(value)=>{setEmail(value)}}
                />
            </View>

            <Text style={styles.forgotText}>
                <Text style={{ color: "#FF4B26" }}>*</Text> We will send you a message to set or reset your new password
            </Text>

            <Button title={"Submit"} />

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
                    <Text style={styles.text}>Remember your account? </Text>
                    <TouchableOpacity onPress={handleNavigateLogin}>
                        <Text style={styles.textPrimary}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPass

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
        gap: 30,
        marginBottom: 30,
    },
    forgotText: {
        color: "#676767",
        fontFamily: "Montserrat_400Regular",
        fontSize: SIZES.font14,
        textAlign: "left",
        marginBottom: 50,
    },
    image: {
        width: 60,
        height: 60,
    },
    thirdParty: {
        marginTop: 50,
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