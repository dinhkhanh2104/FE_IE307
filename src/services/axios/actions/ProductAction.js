import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.products)
        if (response.status === 200) {
            return response.data.data
        }
        else {
            throw new Error("Fail to fetch products")
        }
    }
    catch (error) {
        console.error("Error fetching products", error);
        throw error
    }
}

export const getProductDetail = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.productDetail + id)
        if (response.status === 200) {
            return response.data
        }
        else {
            throw new Error("Fail to fetch product detail")
        }
    }
    catch (error) {
        console.error("Error fetching product detail", error);
        throw error
    }
}

export const getProductByCategory = async (category) => {
    try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.products}/${category}/findByCate`)

        if (response.status === 200) {
            // console.log(response.data.data);
            return response.data.data
        }
        else {
            throw new Error("Fail to fetch product by category")
        }
    }
    catch (error) {
        console.error("Error fetching product by category", error);
        throw error
    }
}

export const searchProducts = async (searchText) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.search, { name: searchText })
        return response.data.data
    }
    catch (error) {
        console.error("Error searching products", error);
        throw error
    }
}

export const createProduct = async (product) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error('User token is not available');
        }

        // Gửi yêu cầu POST để tạo sản phẩm
        const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(product), // Chuyển đối tượng sản phẩm thành chu
        });

        // Kiểm tra kết quả
        const data = await response.json();
        console.log('Product Data:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create product');
        }

        return data.data; // Trả về dữ liệu sản phẩm mới tạo
    } catch (error) {
        console.error('Error creating product:', error);
        throw error; // Bắn lỗi để xử lý bên ngoài
    }
};
