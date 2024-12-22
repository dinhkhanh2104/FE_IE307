import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VoucherModal from '../components/VoucherModal'; // Giả sử VoucherModal đã được tạo
import AuthContext from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';  // Import the useFocusEffect hook

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVoucherModalVisible, setVoucherModalVisible] = useState(false);
  const { logout } = useContext(AuthContext);

  // Lấy mã giảm giá từ server
  const fetchDiscounts = async () => {
    try {
      const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/discount/valid');
      const data = await response.json();

      if (response.ok) {
        setDiscounts(data.data);
      } else {
        console.error('Error fetching discounts:', data.message);
        setDiscounts([]);
      }
    } catch (error) {
      console.error('Error fetching discounts:', error);
      setDiscounts([]);
    }
  };

  // Lấy userId từ AsyncStorage
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('userInfo');
      if (userId) {
        fetchUserData(userId);
      } else {
        console.log("User not found in AsyncStorage");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error retrieving userId from AsyncStorage", error);
      setLoading(false);
    }
  };

  const fetchUserData = (userId) => {
    fetch(`https://ie-307-6017b574900a.herokuapp.com/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  };

  // Fetch data each time screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true); // Start loading state
      getUserId();
      fetchDiscounts(); // Fetch mã giảm giá mỗi khi màn hình được focus
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Đồng ý", onPress: logout }
      ]
    );
  };

  // Hàm xử lý khi áp dụng mã giảm giá
  const applyVoucher = () => {
    navigation.navigate("Home");
    setVoucherModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image
          source={{
            uri: user?.profilePicture || 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png', // Replace with user's profile picture URL
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>{user?.username || 'Loading...'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'Loading...'}</Text>
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.options}>
        <OptionItem title="Đơn hàng" description="Xem tình trạng đơn hàng" onPress={() => navigation.navigate("MyOrdersScreen")} />
        <OptionItem title="Địa chỉ giao hàng" description="Thay đổi và cập nhật địa chỉ giao hàng" onPress={() => navigation.navigate("AddressSelection")} />
        <OptionItem
          title="Mã giảm giá"
          description="Xem các mã giảm giá đang có"
          onPress={() => setVoucherModalVisible(true)} // Mở modal khi nhấn vào "Mã giảm giá"
        />
        <OptionItem title="Cài đặt" description="Thông tin tài khoản, password" onPress={() => navigation.navigate("ChangeProfileScreen", {
          userId: user._id,    // Truyền userId
          username: user.username,  // Truyền username
          email: user.email,  // Truyền email
        })} />
      </View>

      {/* Thêm nút đăng xuất */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* Voucher Modal */}
      <VoucherModal
        visible={isVoucherModalVisible}
        vouchers={discounts}
        onApply={applyVoucher}  // Thêm hàm xử lý áp dụng voucher
        onClose={() => setVoucherModalVisible(false)}  // Đóng modal khi người dùng đóng
      />
    </ScrollView>
  );
};

// Component OptionItem
const OptionItem = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <View>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
    </View>
    <Text style={styles.arrow}>›</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
  },
  options: {
    marginTop: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: 14,
    color: '#888',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  logoutButton: {
    padding: 15,
    backgroundColor: '#FF4F4F',
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
