import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ie-307-6017b574900a.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
