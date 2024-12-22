import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = "https://ie-307-6017b574900a.herokuapp.com";

// 1. Lấy danh sách tất cả discount
export const getDiscounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/discount`);

    if (response.status === 200) {
      return response.data;  // Trả về dữ liệu discount
    } else {
      throw new Error('Không thể lấy danh sách giảm giá');
    }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách giảm giá:', error);
    throw error;
  }
};

// 2. Cập nhật trạng thái của discount (Kích hoạt/Vô hiệu hóa)
export const updateDiscountStatus = async (id, updateData) => {
  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
    throw new Error('User token is not available');
  }

  try {
    const response = await fetch(`${API_URL}/discount/${id}/update`, {
      method: "POST",  // Thay vì "POST", nên dùng "PATCH" để cập nhật
      headers: {
        'Authorization': `Bearer ${token}`, // Gửi token trong header
        'Content-Type': 'application/json', // Đảm bảo kiểu dữ liệu là JSON
      },
      body: JSON.stringify(updateData),  // Chuyển đổi updateData thành JSON
    });

    console.log(response)

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return data;  // Trả về dữ liệu đã cập nhật
    } else {
      throw new Error('Không thể cập nhật trạng thái giảm giá');
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái giảm giá:', error);
    throw error;
  }
};
