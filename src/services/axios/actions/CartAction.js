import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";


export const getCart = async (id) => {
    try {
        const response = await axiosInstance.get(API_ENDPOINTS.cart + id)
        if (response.status === 200)
        {
            return response.data
        }
        else {
            throw new Error("Fail to fetch cart")
        }
    }
    catch(error)
    {
        console.error("Error fetching cart", error);
        throw error
    }

    // return axiosInstance.get(API_ENDPOINTS.userCart + id)
}

