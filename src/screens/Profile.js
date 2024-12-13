import { SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import React from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS } from '../constants/theme';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
      >
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={{ width: 110, }}>
            <Image
              source={require("../../assets/images/default_avatar.jpg")}
              style={styles.image}
            />
            <View style={{ backgroundColor: "white", width: 40, height: 40, borderRadius: 999, justifyContent: "center", alignItems: "center", position: "absolute", bottom: 0, right: 0 }}>
              <View style={{ backgroundColor: COLORS.primary, width: 34, height: 34, borderRadius: 999, justifyContent: "center", alignItems: "center" }}>
                <FontAwesome6 name="pencil" size={16} color="white" />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.personalDetails}>
          <Text style={styles.title}>Personal Details</Text>
          <View>
            <Text>Email Address</Text>
            <InputField value={"khanhdeptrai@gmail.com"} />
          </View>
          <View>
            <Text>Password</Text>
            <InputField value={"khanhdeptrai@gmail.com"} isPassword={true} />
            <Text style={{ color: COLORS.primary, textDecorationLine: 'underline', textAlign: "right" }}>Change Password</Text>
          </View>
        </View>

        <View style={styles.personalDetails}>
          <Text style={styles.title}>Business Address Details</Text>
          <View>
            <Text>Address</Text>
            <InputField value={"khanhdeptrai@gmail.com"} />
          </View>
          <View>
            <Text>City</Text>
            <InputField value={"khanhdeptrai@gmail.com"} />
          </View>

        </View>

        <View style={styles.personalDetails}>
          <Text style={styles.title}>Bank Account Details</Text>
          <View>
            <Text>Bank Account Number</Text>
            <InputField value={"khanhdeptrai@gmail.com"} />
          </View>
          <View>
            <Text>Account holder's name</Text>
            <InputField value={"khanhdeptrai@gmail.com"} isPassword={true} />
          </View>
        </View>

        <Button title={"Save"}/>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight + 20 || 0,
    paddingHorizontal: 20,
  },

  wrapper: {
    flexDirection: "column",
    gap: 20
  },
  
  image: {
    width: 100,
    height: 100,
    borderRadius: 999
  },
  
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  personalDetails: {
    paddingBottom: 40,
    borderBottomWidth: 1,  // Thêm borderBottomWidth để tạo độ dày cho đường viền
    borderBottomColor: "#C4C4C4", // Màu của đường viền dưới
  }
});
