import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AuthContext from '../contexts/AuthContext'; // Giả sử bạn lưu trữ địa chỉ trong Context
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const { addresses , setAddress } = useContext(AuthContext); // Đảm bảo addresses không phải undefined

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Vietnam');  // Default value for country
  const [isDefault, setIsDefault] = useState(false);

  const handleSaveAddress = async () => {
    // Kiểm tra các trường nhập liệu
    if (!name || !phoneNumber || !ward || !street || !city) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin địa chỉ.');
      return;
    }

    // Lấy token từ AsyncStorage
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
      return;
    }

    // Tạo đối tượng địa chỉ
    const newAddress = {
      name,
      phoneNumber,
      ward,
      street,
      city,
      country,
      isDefault,  // Giá trị mặc định có thể là true hoặc false
    };

    console.log(JSON.stringify(newAddress))

    try {
      // Gửi yêu cầu POST đến API để thêm địa chỉ
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/addresses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });

      console.log(response)

      const data = await response.json();
      console.log(data)

      await fetchAddresses();

      Alert.alert('Thành công', 'Địa chỉ đã được thêm thành công!');
      navigation.goBack(); // Quay lại màn hình trước
    } catch (error) {
      console.error("Error adding address:", error);
      Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi khi thêm địa chỉ.');
    }
  };

  // Hàm để fetch lại danh sách địa chỉ
  const fetchAddresses = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
      return;
    }

    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/addresses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Không thể tải danh sách địa chỉ');
      }

      const data = await response.json();
      if (!data) {
        throw new Error('Không nhận được dữ liệu từ server');
      }

      // Cập nhật lại context
      setAddress(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi khi tải địa chỉ.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm địa chỉ mới</Text>
        <View style={{ width: 26 }} /> {/* Placeholder để căn giữa tiêu đề */}
      </View>

      {/* Form nhập thông tin */}
      <View style={styles.form}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ và tên"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <Text style={styles.label}>Phường/Xã</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập phường/xã"
          value={ward}
          onChangeText={setWard}
        />

        <Text style={styles.label}>Địa chỉ chi tiết</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ chi tiết"
          value={street}
          onChangeText={setStreet}
        />

        <Text style={styles.label}>Tỉnh/Thành phố</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tỉnh/thành phố"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Quốc gia</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập quốc gia"
          value={country}
          onChangeText={setCountry}
        />

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsDefault(!isDefault)}
        >
          <Ionicons
            name={isDefault ? 'checkbox' : 'square-outline'}
            size={24}
            color="#F83758"
          />
          <Text style={styles.checkboxText}>Đặt làm địa chỉ mặc định</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Lưu địa chỉ */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Lưu địa chỉ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  form: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 6,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
  },
  saveButton: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#F83758',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;
