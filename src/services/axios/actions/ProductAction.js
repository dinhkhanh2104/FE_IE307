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

        const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                body: JSON.stringify(product)
            },

        });

        console.log(JSON.stringify(product))


        console.log(await response.json())
        // if (response.status === 201) {
        const data = await response.json();
        console.log(data)
        return data.data
        // }
        // else {
        //     throw new Error("Fail to fetch cart")
        // }
    }
    catch (error) {
        // console.error("Error fetching cart", error);
        throw error
    }
}