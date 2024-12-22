import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Image } from 'react-native';

const User = () => {
  // Dữ liệu giả với nhiều người dùng hơn
  const [users, setUsers] = useState([
    { id: '1', name: 'Tran Nguyen Tuong Vu', email: 'tuongvu@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Nguyen Van A', email: 'nguyenvana@example.com', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Le Thi B', email: 'lethib@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Pham Van C', email: 'phamvanc@example.com', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Hoang Thi D', email: 'hoangthid@example.com', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '6', name: 'Bui Van E', email: 'buivane@example.com', avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', name: 'Ngo Thi F', email: 'ngothif@example.com', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: '8', name: 'Le Van G', email: 'levang@example.com', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: '9', name: 'Tran Thi H', email: 'tranthih@example.com', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '10', name: 'Pham Van I', email: 'phamvani@example.com', avatar: 'https://i.pravatar.cc/150?img=10' },
  ]);

  const handleDelete = (id) => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa người dùng này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đồng ý',
        onPress: () => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        },
      },
    ]);
  };

  const handleEdit = (user) => {
    Alert.alert('Tính năng chưa có sẵn');
  };

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Text style={styles.actionText}>Xem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.actionText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý người dùng</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có người dùng nào</Text>}
      />
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  userItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
