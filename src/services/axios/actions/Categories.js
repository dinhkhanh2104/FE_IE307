import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";

export const getCategories = async () => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.category)
        if (response.status === 200) {
            return response.data.data
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


