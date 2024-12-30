import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Card, Badge } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { getAllOrder, updateOrder } from "../../services/axios/actions/OrderAction";
import Toast from "react-native-toast-message";

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrder();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Lấy danh sách đơn hàng thất bại:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    // Cập nhật UI một cách lạc quan
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );

    const updateData = {
      updateData: {
        status: newStatus,
      },
    };

    try {
      const updated = await updateOrder(id, updateData);
      if (updated) {
         Alert.alert("Thành công", "Cập nhật trạng thái đơn hàng thành công!");
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: "Cập nhật trạng thái đơn hàng thất bại.",
      });
    }
  };

  const renderOrderItem = ({ item }) => {
    const formattedDate = new Date(item.createdAt).toLocaleDateString();

    return (
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.orderId}>Mã đơn hàng: {item._id.slice(1,8)}</Text>
          <Badge style={[styles.badge, styles[item.status]]}>
            {item.status.toUpperCase()}
          </Badge>
        </View>
        <Text style={styles.userId}>Mã người dùng: {item.userId}</Text>
        <View>
          {item.items.map((product) => (
            <View key={product._id} style={styles.product}>
              <Image
                source={{
                  uri: product.variationImage?.[0] || "https://via.placeholder.com/50", // dự phòng nếu không có hình ảnh
                }}
                style={styles.productImage}
              />
              <Text style={styles.productText}>
                {product.sku} - {product.quantity} x{" "}
                {product.price.toLocaleString()} VND
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.total}>
          Tổng cộng: {item.totalPrice.toLocaleString()} VND
        </Text>
        <Text style={styles.payment}>
          Phương thức thanh toán: {item.paymentMethod.toUpperCase()}
        </Text>
        {item.discountCode && (
          <Text style={styles.discount}>
            Mã giảm giá: {item.discountCode}
          </Text>
        )}
        <Text style={styles.date}>Ngày: {formattedDate}</Text>
        {item.shippingAddress && (
          <Text style={styles.address}>
            Địa chỉ giao hàng: {item.shippingAddress.addressDetail}
          </Text>
        )}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={item.status}
            style={styles.picker}
            onValueChange={(newStatus) =>
              updateOrderStatus(item._id, newStatus)
            }
          >
            <Picker.Item label="Đang chờ" value="pending" />
            <Picker.Item label="Hoàn thành" value="shipped" />
            <Picker.Item label="Đã hủy" value="cancelled" />
          </Picker>
        </View>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Danh sách đơn hàng</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không tìm thấy đơn hàng nào.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
        />
      )}
      <Toast position='bottom' bottomOffset={20} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 16,
  },
  badge: {
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
  },
  pending: {
    backgroundColor: "#f39c12",
  },
  completed: {
    backgroundColor: "green",
  },
  cancelled: {
    backgroundColor: "red",
  },
  userId: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  productText: {
    fontSize: 14,
    color: "#555",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  payment: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  discount: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    fontStyle: "italic",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  pickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#333",
  },
});

export default OrderScreen;
