import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoints";


export const login = async (username, password) => {
    console.log("Attempting to login with", username, password);
    return axiosInstance.post(API_ENDPOINTS.login, { username: username, password: password })
}