import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";


export const login = async (email, password) => {
    console.log("Login with", email, password);
    return axiosInstance.post(API_ENDPOINTS.login, { email: email, password: password })
}

export const register = async ( email, password) => {
    return axiosInstance.post(API_ENDPOINTS.register, {username: "test4", email, password})
}
