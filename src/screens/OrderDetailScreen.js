import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StatusBar, Image } from 'react-native';
import { COLORS } from '../constants/theme';  // Import COLORS from theme file
import { getOrderById } from '../services/axios/actions/OrderAction';  // Your API call for fetching order details
import formatCurrency from '../../utils/formatCurrency';  // Utility for formatting currency
import Loading from '../components/Loading';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import icon from react-native-vector-icons

const OrderDetailScreen = ({ route, navigation }) => {
  const { orderId } = route.params;  // Get orderId from navigation params
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderDetails = await getOrderById(orderId);  // Fetch order details from API
        setOrder(orderDetails);  // Save the order to state
      } catch (error) {
        console.error('Error fetching order details:', error);  // Handle error
      }
    };

    if (orderId) {
      fetchOrderDetails();  // Fetch order details if orderId exists
    }
  }, [orderId]);  // Re-run when orderId changes

  if (!order) return <Loading />;  // Display loading screen if data is not available

  const renderItem = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        <Image source={{ uri: item.productDetails.images[0] }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <View style={styles.productRow}>
            <Text style={styles.productLabel}>Sản phẩm: </Text>
            <Text style={styles.productContent} numberOfLines={1}>{item.productDetails.name}</Text>
          </View>
          <View style={styles.productRow}>
            <Text style={styles.productLabel}>Thương hiệu: </Text>
            <Text style={styles.productContent}>{item.productDetails.brand}</Text>
          </View>
          <View style={styles.productRow}>
            <Text style={styles.productLabel}>Màu sắc: </Text>
            <Text style={styles.productContent}>{item.variationDetails.attributes[0].values[0]}</Text>
          </View>
          <View style={styles.productRow}>
            <Text style={styles.productLabel}>Giá: </Text>
            <Text style={styles.productContent}>{formatCurrency(item.variationDetails.price)}</Text>
          </View>
          <View style={styles.productRow}>
            <Text style={styles.productLabel}>Số lượng: </Text>
            <Text style={styles.productContent}>{item.quantity}</Text>
          </View>
        </View>
      </View>
    );
  };

  // Format the shipping address from the API data
  const getShippingAddress = () => {
    const { addressDetail, ward, province } = order.shippingAddress;
    return `${addressDetail}, ${ward}, ${province}, Vietnam`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.orderNumber}>Đơn hàng: {"SHOPPEE " + order._id.slice(1, 6)}</Text>
      <Text style={styles.orderDate}>Ngày mua hàng: {new Date(order.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.orderStatus}>Trạng thái: {order.productId}</Text>

      {/* Render product list */}
      <FlatList
        data={order.items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      <View style={styles.orderInfo}>
        {order.shippingAddress ?
          <View style={styles.addressContainer}>
            <Text style={styles.label}>Địa chỉ giao hàng: </Text>
            <Text style={styles.content}>{getShippingAddress()}</Text>
          </View> : null}

        <View style={styles.paymentContainer}>
          <Text style={styles.label}>Phương thức thanh toán: </Text>
          <Text style={[styles.content, { textDecoration: 'uppercase' }]}>{order.paymentMethod}</Text>
        </View>

        <View style={styles.paymentContainer}>
          <Text style={styles.label}>Tổng số tiền: </Text>
          <Text style={styles.content}>{formatCurrency(order.totalPrice)}</Text>
        </View>

        <View style={styles.deliveryContainer}>
          <Text style={styles.label}>Phương thức giao hàng: </Text>
          <Text style={styles.content}>{"TIÊU CHUẨN"}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => alert('Reorder pressed')}>
          <Text style={styles.buttonText}>Đặt lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FeedbackScreen",{productId:order.items})}>
          <Text style={styles.buttonText}>Gửi phản hồi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.secondary,
    marginTop: StatusBar.currentHeight,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  productLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productContent: {
    fontSize: 14,
    color: '#555',
  },
  orderInfo: {
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    fontSize: 14,
    color: COLORS.primary,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  paymentContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  deliveryContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderDetailScreen;
