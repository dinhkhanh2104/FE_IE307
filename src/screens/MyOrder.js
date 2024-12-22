import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar, Image, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/theme';  // Import COLORS from theme file
import { getUserOrder } from '../services/axios/actions/OrderAction';  // Gọi API lấy đơn hàng
import Icon from 'react-native-vector-icons/FontAwesome';  // Import icon từ react-native-vector-icons
import formatCurrency from '../../utils/formatCurrency';
import { useNavigation } from '@react-navigation/native';

const MyOrdersScreen = () => {
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);  // Added loading state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getUserOrder();  // Lấy dữ liệu đơn hàng từ API
        setOrders(fetchedOrders);  // Lưu đơn hàng vào state
      } catch (error) {
        console.error('Lỗi khi tải đơn hàng:', error);  // Xử lý lỗi
      } finally {
        setLoading(false);  // Set loading to false after fetching is complete
      }
    };

    fetchOrders();  // Gọi hàm tải đơn hàng
  }, []);  // Mảng rỗng đảm bảo chỉ chạy một lần khi render lần đầu tiên

  const [selectedTab, setSelectedTab] = useState('pending');  // Mặc định tab là 'pending'

  // Lọc đơn hàng theo tab được chọn
  const filteredOrders = orders.filter(order => order.status === selectedTab);

  // Render từng đơn hàng với chi tiết sản phẩm
  const renderItem = ({ item }) => {
    // Lấy sản phẩm đầu tiên trong đơn hàng
    const product = item.items[0];  // Chọn sản phẩm đầu tiên trong mảng items

    return (
      <View style={styles.orderContainer}>
        <View style={styles.orderDetails}>
          <Text style={styles.orderText}>Đơn hàng: {"SHOPPEE " + item._id.slice(1, 6)}</Text>
          <Text style={styles.orderText}>{new Date(item.createdAt).toLocaleDateString()}</Text> {/* Định dạng ngày */}
        </View>
        <View style={styles.orderDetails}>
          <Text style={[styles.orderText,{textTransform: 'uppercase'}]}>Payment: {item.paymentMethod}</Text>
          <Text style={styles.orderText}>Tổng số tiền: {formatCurrency(item.totalPrice)}</Text>
        </View>

        <Text style={styles.productLabel}>
          Sản phẩm:  
          <Text style={styles.productContent}> {product.product.name}</Text>
        </Text>
        
        {/* Render chi tiết sản phẩm đầu tiên */}
        <View style={styles.productDetails}>
          <Image
            source={{ uri: product.product.images[0] }}
            style={styles.productImage}
          />
          <View>
            <Text style={styles.productLabel}>
              Thương hiệu:
              <Text style={styles.productContent}> {product.product.brand}</Text>
            </Text>
            <Text style={styles.productLabel}>
              Giá:
              <Text style={styles.productContent}> {formatCurrency(product.variation.price)}</Text>
            </Text>
          </View>
        </View>
        
        <Text style={[styles.orderText, styles.status,{textTransform: 'uppercase',}]}>Trạng thái: {item.status}</Text>
        <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate("OrderDetailScreen",{orderId:item._id})}>
          <Text style={styles.detailsButtonText}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    )
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={COLORS.text} />
        <Text style={styles.goBackText}>Profile</Text>
      </TouchableOpacity>

      {/* Điều hướng qua các tab */}
      <View style={styles.tabs}>
        {['pending', 'shipped', 'canceled'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Icon name={tab === 'pending' ? 'hourglass-half' : tab === 'shipped' ? 'truck' : 'times'} size={18} color={selectedTab === tab ? '#fff' : COLORS.primary} />
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,  // Sử dụng COLORS.secondary cho màu nền
    paddingTop: 20,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',   
    marginBottom: 20,
  },
  goBackText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#f0f0f0',  // Màu nền sáng cho các tab
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.primary,  // Màu nền cho tab đang được chọn
    borderColor: COLORS.primary,  // Màu viền cho tab đang chọn
  },
  tabText: {
    fontSize: 16,
    color: COLORS.text,  // Màu chữ mặc định cho các tab
    marginTop: 5,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',  // Viền nhẹ quanh đơn hàng
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderText: {
    fontSize: 14,
    color: COLORS.text,  // Màu chữ cho thông tin đơn hàng
    fontWeight: '500',
  },
  status: {
    color: COLORS.primary,  // Màu sắc trạng thái
    fontWeight: 'bold',
  },
  detailsButton: {
    backgroundColor: COLORS.primary,  // Màu nền cho nút
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productDetails: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  productLabel: {
    fontSize: 13,
    fontWeight: 'bold',  // Tạo kiểu cho nhãn
    color: '#333',  // Màu sắc của nhãn
    marginBottom: 3,
  },
  productContent: {
    fontSize: 13,
    fontWeight: 'light', 
    color: '#555',  // Màu sắc của nội dung
    marginBottom: 5,
  },
  productImage: {
    width: 100,  // Kích thước cố định cho ảnh sản phẩm
    height: 100,  // Kích thước cố định cho ảnh sản phẩm
    borderRadius: 8,  // Bo tròn góc ảnh sản phẩm
    marginBottom: 10,
    marginRight: 10,  // Tạo khoảng cách giữa ảnh và text
  },
});

export default MyOrdersScreen;
