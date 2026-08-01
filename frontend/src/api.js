import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-theta-pied-39.vercel.app',
});

export default API;
