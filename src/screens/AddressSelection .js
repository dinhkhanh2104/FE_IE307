import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressSelection = () => {
  const navigation = useNavigation();
  const { address,setAddress } = useContext(AuthContext);

  // Initialize address state with the data from context
  const [addresses, setAddresses] = useState(address);

  // Handle address selection (checkbox) and setting it as the default address
  const handleSelectAddress = async (id) => {
    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await fetch(`https://ie-307-6017b574900a.herokuapp.com/addresses/default/${id}`, {
        method: "POST", 
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Update local addresses state to reflect the default address change
        const updatedAddresses = addresses.map(item =>
          item._id === id ? { ...item, isDefault: true } : { ...item, isDefault: false }
        );
        setAddresses(updatedAddresses);
        setAddress(updatedAddresses)
        
        // Optionally, you can alert the user that the address has been updated
        Alert.alert('Thành công', 'Đã đặt địa chỉ này là địa chỉ mặc định !');
      } else {
        throw new Error(data.message || 'Lỗi đặt địa chỉ mặt định');
      }
    } catch (error) {
      console.error("Error setting default address:", error);
      Alert.alert('Error', error.message);
    }
  };

  // Handle address editing (navigate to Edit Address screen)
  const handleEditAddress = (id) => {
    navigation.navigate("EditAddress", { id });
  };

  // Handle adding a new address (navigate to Add Address screen)
  const handleAddAddress = () => {
    navigation.navigate("AddAddress");
  };

  // Xử lý xóa địa chỉ
  const handleDeleteAddress = async (id) => {
    const token = await AsyncStorage.getItem('userToken');

    try {
      const response = await fetch(`https://ie-307-6017b574900a.herokuapp.com/addresses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Xóa địa chỉ khỏi state local và context
        const updatedAddresses = addresses.filter((item) => item._id !== id);
        setAddresses(updatedAddresses);
        setAddress(updatedAddresses);
        Alert.alert('Thành công', 'Địa chỉ đã được xóa');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Không thể xóa địa chỉ');
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi khi xóa địa chỉ.');
    }
  };

  // Xác nhận xóa địa chỉ
  const confirmDeleteAddress = (id) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa địa chỉ này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => handleDeleteAddress(id) },
      ],
      { cancelable: true }
    );
  };


  // Update addresses when context data changes
  useEffect(() => {
    setAddresses(address);
  }, [address]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chọn địa chỉ nhận hàng</Text>
        <TouchableOpacity>
          <Text style={styles.editText}>SỬA</Text>
        </TouchableOpacity>
      </View>

      {/* Address List */}
      <FlatList
        data={addresses}
        renderItem={({ item }) => (
          <View style={styles.addressItem}>
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() => handleSelectAddress(item._id)} // Use _id for selection
              style={styles.checkbox}
            >
              <Ionicons
                name={item.isDefault ? 'checkbox-outline' : 'square-outline'}
                size={24}
                color={item.isDefault ? '#F83758' : '#ccc'}
              />
            </TouchableOpacity>

            {/* Address Content */}
            <View style={styles.addressContent}>
              <Text style={styles.addressName}>
                {item.name}
                {item.isDefault && <Text style={styles.defaultText}> [Mặc định]</Text>}
              </Text>
              <Text style={styles.addressDetail}>
                {item.phoneNumber}
              </Text>
              <Text style={styles.addressDetail}>
                {item.addressLine}, {item.ward}, {item.city}, {item.country}
              </Text>
            </View>

            {/* Edit Button */}
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditAddress(item._id)} // Use _id for editing
            >
              <Ionicons name="create-outline" size={22} color="#888" />
            </TouchableOpacity>

            {/* Nút xóa */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmDeleteAddress(item._id)}
            >
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item._id} // Use _id as keyExtractor
      />

      {/* Add New Address */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Ionicons name="add-outline" size={22} color="#888" />
        <Text style={styles.addButtonText}>Thêm địa chỉ mới</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: StatusBar.currentHeight,
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
  editText: {
    color: '#F83758',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  checkbox: {
    marginRight: 12,
  },
  addressContent: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  defaultText: {
    color: '#F83758',
    fontSize: 14,
    fontWeight: '600',
  },
  addressDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  editButton: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
  addButtonText: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
  },
});

export default AddressSelection;
