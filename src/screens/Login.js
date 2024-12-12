import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { SIZES } from '../constants/theme';
import InputField from '../components/InputField';
import { COLORS } from '../constants/theme';
import AuthContext from '../contexts/AuthContext';
import Button from '../components/Button';
import { login } from '../services/axios/actions/UserAction';
import Toast from 'react-native-toast-message';

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from '@expo/vector-icons/Fontisto';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);

  const handleNavigateRegister = () => {
    navigation.navigate("Register");
  };

  const handleNavigateForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'info',
        text1: "Email and password must not be empty!",
      });
      return;
    }
    try {
      const response = await login(email.trim(), password.trim());
      Toast.show({
        type: 'success',
        text1: "Welcome back!",
        text2: "We’re glad to have you here 🤗",
      });
      setTimeout(() => {
        setToken(response.data.token);
      }, 2000);
    } catch (error) {
      const message = error.response ? "Incorrect email or password!" : "Network error or server not reachable.";
      Toast.show({
        type: 'error',
        text1: message
      });
      setEmail('');
      setPassword('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>




      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome</Text>
        <Text style={styles.headerText}>Back!</Text>
      </View>

      <View style={styles.inputField}>
        <InputField
          icon={<FontAwesome6 name="user-large" size={24} color={COLORS.semiGray} />}
          placeholder={"Email"}
          isPassword={false}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <InputField
          icon={<Fontisto name="locked" size={24} color={COLORS.semiGray} />}
          placeholder={"Password"}
          isPassword={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity onPress={handleNavigateForgotPassword}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title={"Login"} onPress={handleLogin} />

      <View style={styles.thirdParty}>
        <Text style={[styles.text, { width: "100%", textAlign: "center" }]}>- Or continue with -</Text>
        <View style={styles.iconArea}>
          <TouchableOpacity style={styles.icon}>
            <Image source={require("../../assets/images/google.png")} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Image source={require("../../assets/images/apple.png")} style={{ width: 36, height: 36 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon}>
            <Image source={require("../../assets/images/facebook.png")} style={{ width: 62, height: 62 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={styles.text}>Create an account</Text>
          <TouchableOpacity onPress={handleNavigateRegister}>
            <Text style={styles.textPrimary}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>


      <Toast
        position='bottom'
        bottomOffset={20} />

    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 26,
    backgroundColor: "white",
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
    marginBottom: 10,
  },
  forgotText: {
    color: COLORS.primary,
    fontFamily: "Montserrat_500Medium",
    fontSize: SIZES.font14,
    textAlign: "right",
    marginBottom: 50,
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
    alignItems: "center",
  },
  image: {
    width: 36,
    height: 36,
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
  },
});
