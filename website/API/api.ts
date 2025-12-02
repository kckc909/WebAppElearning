import axios from 'axios';

const API_BASE_URL = process.env.BACK_END_API_PATH || 'http://localhost:4000/';
console.log(API_BASE_URL)
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
