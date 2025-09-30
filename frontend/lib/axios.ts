import axios from 'axios';

const apiClient = axios.create({
  // Use the environment variable for the base URL
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // Ensure cookies are sent with every request
  withCredentials: true,
});

export default apiClient;