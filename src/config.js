import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });
