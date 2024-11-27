import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://v78xgw3pel.execute-api.ap-south-1.amazonaws.com",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', 
  },
  withCredentials: true, 
});

export default axiosInstance;