import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://ef7c7iljl2.execute-api.us-east-1.amazonaws.com",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', 
  },
  withCredentials: true, 
});

export default axiosInstance;