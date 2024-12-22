import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Card, Badge } from "react-native-paper";
import Toast from "react-native-toast-message";
import { getDiscounts, updateDiscountStatus } from "../../services/axios/actions/DiscountAction";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icon library

const DiscountManagementScreen = ({ navigation }) => {  // Add navigation prop
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await getDiscounts(); // Lấy tất cả các discount từ API
        if (response && response.data) {
          setDiscounts(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách discount:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const toggleDiscountStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const updateData = { isActive: newStatus === "active" };

    try {
      const response = await updateDiscountStatus(id, updateData);
      
      if (response) {
        setDiscounts((prevDiscounts) =>
          prevDiscounts.map((discount) =>
            discount._id === id ? { ...discount, isActive: updateData.isActive } : discount
          )
        );
        Toast.show({
          type: "success",
          text1: `Đã ${newStatus === "active" ? "kích hoạt" : "vô hiệu hóa"} giảm giá thành công!`,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Cập nhật trạng thái giảm giá thất bại.",
      });
    }
  };

  const renderDiscountItem = ({ item }) => {
    const formattedStartDate = new Date(item.startDate).toLocaleDateString();
    const formattedEndDate = new Date(item.endDate).toLocaleDateString();
    const discountStatus = item.isActive ? "active" : "inactive";

    return (
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.code}>Mã giảm giá: {item.code}</Text>
          <Badge style={[styles.badge, styles[discountStatus]]}>{discountStatus.toUpperCase()}</Badge>
        </View>
        <Text style={styles.description}>Mô tả: {item.description}</Text>
        <Text style={styles.discountAmount}>Giảm giá: {item.discountAmount}%</Text>
        <Text style={styles.date}>
          Thời gian: {formattedStartDate} - {formattedEndDate}
        </Text>
        <Text style={styles.usage}>
          Đã sử dụng: {item.usedCount}/{item.usageLimit || "Không giới hạn"}
        </Text>
        {/* Thêm TouchableOpacity */}
        <TouchableOpacity
          style={[styles.button, item.isActive ? styles.deactivateButton : styles.activateButton]}
          onPress={() => toggleDiscountStatus(item._id, discountStatus)}
        >
          <Text style={styles.buttonText}>
            {item.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
          </Text>
        </TouchableOpacity>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Đang tải danh sách giảm giá...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý giảm giá</Text>
      {/* Button to navigate to Add Voucher screen */}
      <TouchableOpacity
        style={styles.addVoucherButton}
        onPress={() => navigation.navigate('AddVoucher')}  // Navigate to "AddVoucher" screen
      >
        <Icon name="plus" size={20} color="#000" style={styles.icon} /> {/* Plus Icon */}
        <Text style={styles.addVoucherText}>Thêm Voucher</Text>
      </TouchableOpacity>

      {discounts.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không có giảm giá nào.</Text>
        </View>
      ) : (
        <FlatList
          data={discounts}
          keyExtractor={(item) => item._id}
          renderItem={renderDiscountItem}
        />
      )}
      <Toast position="bottom" bottomOffset={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  addVoucherButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 3,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row", // Add row direction to align icon and text
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  addVoucherText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    marginLeft: 10, // Add spacing between icon and text
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
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
    textAlign:'center',
    fontSize: 25,
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
  code: {
    fontWeight: "bold",
    fontSize: 16,
  },
  badge: {
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
  },
  active: {
    backgroundColor: "#2ecc71",
  },
  inactive: {
    backgroundColor: "#e74c3c",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  discountAmount: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  usage: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
  },
  activateButton: {
    backgroundColor: "#2ecc71",
  },
  deactivateButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DiscountManagementScreen;
