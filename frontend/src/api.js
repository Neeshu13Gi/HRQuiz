import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.MODE === 'development' 
    ? 'http://localhost:5000' 
    : 'https://backend-theta-pied-39.vercel.app',
});

export default API;
