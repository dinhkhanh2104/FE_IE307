import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.products)
        if (response.status === 200) {
            return response.data
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
        const response = await axiosInstance.get(API_ENDPOINTS.productsByCategory + category)
        if (response.status === 200) {
            return response.data
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

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.category)
        if (response.status === 200) {
            return response.data
        }
        else {
            throw new Error("Fail to fetch categories")
        }
    }
    catch (error) {
        console.error("Error fetching product categories", error);
        throw error
    }
}

