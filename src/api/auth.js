import { axiosInstance } from './config';

export const userLogin = (credentials) =>
  axiosInstance.post('/auth/login', credentials);

export const userRegistration = (credentials) =>
  axiosInstance.post('/auth/register', credentials);

export const verifyToken = () => axiosInstance.get('/auth/verify-token');
