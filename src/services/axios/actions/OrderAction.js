import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";


export const getUserOrder = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error('User token is not available');
        }

        const response = await fetch('https://ie-307-6017b574900a.herokuapp.com/orders/user-order', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
           
        });
        if (response.status === 200)
        {   
            const data = await response.json();

            return data.data
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
}

export const getOrderById = async (orderId) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            throw new Error('User token is not available');
        }

        const response = await fetch(`https://ie-307-6017b574900a.herokuapp.com/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
           
        });
        if (response.status === 200)
        {   
            const data = await response.json();
            console.log(data.data)
            
            return data.data
        }
    }
    catch(error)
    {
        console.error("Error fetching cart", error);
        throw error
    }
}

