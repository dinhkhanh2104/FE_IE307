import { API_ENDPOINTS } from "../endpoints"
import axiosInstance from "../axiosInstance"


export const getWishlist = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.wishlish)
        if (response.status === 200) {
            return response.data.products
        }
        else {
            throw new Error("Fail to fetch wishlist")
        }
    }
    catch (error) {
        console.error("Error fetching wishlist", error);
        throw error
    }
}

export const addToWishlist = async (productId) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.wishlish, { productId })
        if (response.status === 200) {
            // console.log('response:', response.data);
            return response.data
        }
        else {
            throw new Error("Fail to add wishlist")
        }
    }
    catch (error) {
        console.error("Error adding wishlist", error);
        throw error
    }
}

export const deleteWishlist = async (productId) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.deleteWishlist, {productId})
        if (response.status === 200) {
            console.log('response:', response.data);
            return response.data
        }
        else {
            throw new Error("Fail to delete wishlist")
        }
    }
    catch (error) {
        console.error("Error deleting wishlist", error);
        throw error
    }
}