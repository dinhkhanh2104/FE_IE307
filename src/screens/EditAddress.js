import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../contexts/AuthContext';

const EditAddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {setAddress} = useContext(AuthContext)

  const { id } = route.params; // Lấy id của địa chỉ từ tham số truyền vào

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ward, setWard] = useState('');
  const [city, setCity] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [country, setCountry] = useState('Vietnam');
  const [isDefault, setIsDefault] = useState(false);

  // Fetch thông tin địa chỉ từ API khi màn hình được mở
  useEffect(() => {
    const fetchAddressDetails = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
        navigation.goBack();
        return;
      }

      try {
        const response = await fetch(`https://ie-307-6017b574900a.herokuapp.com/addresses/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // console.log(response)

        if (!response.ok) {
          throw new Error('Không thể tải thông tin địa chỉ');
        }

        const data = await response.json();

        // Cập nhật state với dữ liệu từ API
        setName(data.name);
        setPhoneNumber(data.phoneNumber);
        setWard(data.ward);
        setCity(data.city);
        setAddressLine(data.addressLine);
        setCountry(data.country);
        setIsDefault(data.isDefault);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching address details:", error);
        Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi khi tải thông tin địa chỉ.');
        navigation.goBack();
      }
    };

    fetchAddressDetails();
  }, [id, navigation]);

  const handleSaveAddress = async () => {
    if (!name || !phoneNumber || !ward || !addressLine || !city || !country) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin địa chỉ.');
      return;
    }

    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
      return;
    }

    const updatedAddress = {
      name,
      phoneNumber,
      ward,
      city,
      addressLine,
      country,
      isDefault,
    };

    try {
      const response = await fetch(`https://ie-307-6017b574900a.herokuapp.com/addresses/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAddress),
      });

      if (!response.ok) {
        throw new Error('Không thể cập nhật địa chỉ');
      }

      await fetchAddresses()

      Alert.alert('Thành công', 'Địa chỉ đã được cập nhật!');
      navigation.goBack();
    } catch (error) {
      console.error("Error updating address:", error);
      Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi khi cập nhật địa chỉ.');
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


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F83758" />
        <Text style={styles.loadingText}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sửa địa chỉ</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Form nhập liệu */}
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
          value={addressLine}
          onChangeText={setAddressLine}
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

      {/* Nút Lưu thay đổi */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});

export default EditAddressScreen;
