import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios"; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"; 
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddVoucherScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [isActive, setIsActive] = useState(true); // default active
  const [minOrderAmount, setMinOrderAmount] = useState("0");

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(moment(date).format("YYYY-MM-DD"));
    setStartDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(moment(date).format("YYYY-MM-DD"));
    setEndDatePickerVisible(false);
  };

  const handleCreateVoucher = async () => {
    const voucherData = {
      code,
      description,
      discountAmount:parseInt(discountAmount),
      discountType: "percentage", 
      startDate,
      endDate,
      minOrderAmount: parseInt(minOrderAmount),
      isActive,
      usageLimit: parseInt(usageLimit),
    };

    try {
      const response = await fetch("https://ie-307-6017b574900a.herokuapp.com/discount/create", {
        method: "POST",
        body: JSON.stringify(voucherData),
      });

      console.log(
       JSON.stringify(voucherData),
      )
      
      console.log(await response.json())


      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Voucher created successfully!",
        });
        navigation.goBack(); // Navigate back after successful creation
      } else {
        throw new Error("Failed to create voucher.");
      }
    } catch (error) {
        
      console.error("Error creating voucher:", error);
      Toast.show({
        type: "error",
        text1: "Failed to create voucher.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm Voucher Mới</Text>

      <TextInput
        style={styles.input}
        placeholder="Mã giảm giá"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Giảm giá (%)"
        keyboardType="numeric"
        value={discountAmount}
        onChangeText={setDiscountAmount}
      />

      {/* Start Date Picker */}
      <TouchableOpacity style={styles.datePickerButton} onPress={showStartDatePicker}>
        <Icon name="calendar" size={20} color="#333" style={styles.icon} />
        <Text style={styles.dateText}>{startDate ? startDate : "Ngày bắt đầu"}</Text>
      </TouchableOpacity>

      {/* End Date Picker */}
      <TouchableOpacity style={styles.datePickerButton} onPress={showEndDatePicker}>
        <Icon name="calendar" size={20} color="#333" style={styles.icon} />
        <Text style={styles.dateText}>{endDate ? endDate : "Ngày kết thúc"}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Giới hạn sử dụng"
        keyboardType="numeric"
        value={usageLimit}
        onChangeText={setUsageLimit}
      />
      <TextInput
        style={styles.input}
        placeholder="Số tiền đơn hàng tối thiểu"
        keyboardType="numeric"
        value={minOrderAmount}
        onChangeText={setMinOrderAmount}
      />

      <TouchableOpacity
        style={styles.toggleStatusButton}
        onPress={() => setIsActive(!isActive)}
      >
        <Text style={styles.buttonText}>
          {isActive ? "Vô hiệu hóa" : "Kích hoạt"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={handleCreateVoucher}>
        <Text style={styles.buttonText}>Tạo Voucher</Text>
      </TouchableOpacity>

      {/* Date Picker Modals */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={() => setStartDatePickerVisible(false)}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={() => setEndDatePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    color: "#2c3e50",
  },
  input: {
    height: 50,
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: "#ecf0f1",
    color: "#2c3e50",
  },
  datePickerButton: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    flexDirection: "row", 
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#2c3e50",
    marginLeft: 10,
  },
  icon: {
    marginRight: 12,
  },
  toggleStatusButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 25,
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddVoucherScreen;
