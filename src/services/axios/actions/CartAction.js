import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";


export const getCart = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error('User token is not available');
        }

        const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
           
        });
        if (response.status === 200)
        {   
            const data = await response.json();
            return data.cart.items
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

export const addToCart = async (sku, id) => {
    try {
        console.log(`Adding to cart - SKU: ${sku}, ID: ${id}`);

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error('User token is not available');
        }
        
        const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                "sku": sku,
                "productId": id,
                "quantity": 1,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add to cart: ${errorData.message || response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error in addToCart:', error);
        throw error; // Rethrow error for further handling
    }
};
