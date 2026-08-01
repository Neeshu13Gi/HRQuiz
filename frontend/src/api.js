import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://hr-quiz-8qg8.vercel.app',
});

export default API;
