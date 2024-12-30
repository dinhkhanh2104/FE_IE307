import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/theme';

const ChangeProfileScreen = ({ route, navigation }) => {
  const { userId, username, email } = route.params;

  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const updateUser = async () => {
    if (!newUsername || !newEmail) {
      Alert.alert('Lỗi', 'Tên người dùng và email không được để trống!');
      return;
    }

    setLoading(true);
    const updatedData = {
      username: newUsername,
      email: newEmail,
      ...(newPassword && { password: newPassword }), 
    }


    try {
      const response = await fetch(`https://ie-307-6017b574900a.herokuapp.com/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });



      console.log('Cập nhật thông tin người dùng:', response);

      if (response.ok) {
        Alert.alert('Thành công', 'Thông tin của bạn đã được cập nhật.');
        // Save only the fields that were changed
        await AsyncStorage.setItem('userInfo', JSON.stringify(updatedData));
        navigation.goBack();
      } else {
        Alert.alert('Lỗi', data.message || 'Có gì đó không ổn!');
      }
    } catch (error) {
      console.error( error);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin người dùng.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with Go Back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Text style={styles.goBackText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thay đổi thông tin</Text>
      </View>

      <View style={styles.form}>
        {/* Tên người dùng */}
        <Text style={styles.label}>Tên người dùng</Text>
        <TextInput
          style={styles.input}
          value={newUsername}
          onChangeText={setNewUsername}
          placeholder="Nhập tên người dùng mới"
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="Nhập email mới"
          keyboardType="email-address"
        />

        {/* Mật khẩu */}
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Nhập mật khẩu mới"
          secureTextEntry
        />

        {/* Nút Lưu */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={updateUser}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 30, // Fallback value if StatusBar.currentHeight is undefined
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
    marginRight: 15,
  },
  goBackText: {
    fontSize: 24,
    color: '#6200ea',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -5 },
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    elevation: 3,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ChangeProfileScreen;
