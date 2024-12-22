import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

const ProfileScreen = ({navigation}) => {
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
            uri: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png', // Replace with user's profile picture URL
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>Matilda Brown</Text>
          <Text style={styles.profileEmail}>matildabrown@mail.com</Text>
        </View>
      </View>

      {/* Profile Options */}
      <View style={styles.options}>
        <OptionItem title="Đơn hàng" description="Xem tình trạng đơn hàng" onPress={() => navigation.navigate("MyOrdersScreen")}/>
        <OptionItem title="Địa chỉ giao hàng" description="Thay đổi và cập nhật địa chỉ giao hàng" onPress={() => navigation.navigate("AddressSelection")}/>
        <OptionItem title="Payment methods" description="Visa •••• 34" />
        <OptionItem title="Mã giảm giá" description="Xem các mã giảm giá đang có" />
        <OptionItem title="Các đánh giá của tôi" description="Xem lại các đánh giá của bạn" />
        <OptionItem title="Cài đặt" description="Thông tin tài khoản, password" />
      </View>
    </ScrollView>
  );
};

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
    marginTop:StatusBar.currentHeight,
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
});

export default ProfileScreen;
