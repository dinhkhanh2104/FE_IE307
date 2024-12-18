import { SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, TextInput } from 'react-native';
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
            <TouchableOpacity style={styles.buttonWrapper}>
              <View style={{ backgroundColor: COLORS.primary, width: 34, height: 34, borderRadius: 999, justifyContent: "center", alignItems: "center" }}>
                <FontAwesome6 name="pencil" size={16} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.titleText}>
          <Text style={styles.title}>Personal Details</Text>
          <View style={{ gap: 10 }}>
            <Text>Email Address</Text>
            <TextInput style={styles.textInputField} />
          </View>
          <View style={{ gap: 10 }}>
            <Text>Password</Text>
            <TextInput style={styles.textInputField} />
            <Text style={styles.textChangePasss}>Change Password</Text>
          </View>
        </View>

        <View style={styles.titleText}>
          <Text style={styles.title}>Business Address Details</Text>
          <View style={{ gap: 10 }}>
            <Text>Address</Text>
            <TextInput style={styles.textInputField} />
          </View>
          <View style={{ gap: 10 }}>
            <Text>City</Text>
            <TextInput style={styles.textInputField} />
          </View>
        </View>

        <View style={[styles.titleText, { borderBottomWidth: 0 }]}>
          <Text style={styles.title}>Bank Account Details</Text>
          <View style={{ gap: 10 }}>
            <Text>Bank Account Number</Text>
            <TextInput style={styles.textInputField} />
          </View>
          <View style={{ gap: 10 }}>
            <Text>Password</Text>
            <TextInput style={styles.textInputField} />
          </View>
        </View>


        <View style={{ paddingHorizontal: "6%" }}>
          <Button title={"Save"} />
        </View>

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

  buttonWrapper: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
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

  titleText: {
    paddingBottom: 40,
    borderBottomWidth: 1,  // Thêm borderBottomWidth để tạo độ dày cho đường viền
    borderBottomColor: "#C4C4C4", // Màu của đường viền dưới
    gap: 20,
  },

  textInputField: {
    borderColor: "#C8C8C8",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
  },
  textChangePasss: {
    color: COLORS.primary,
    textAlign: "right",
    textDecorationLine: 'underline',
    marginTop: 5,
  }

});
