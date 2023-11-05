import { axiosInstance } from './config';

export const userLogin = (credentials) =>
  axiosInstance.post('/auth/login', credentials);

export const userRegistration = (data) =>
  axiosInstance.post('/auth/register', data);

export const resendEmail = (data) =>
  axiosInstance.post('/auth/resend-email', data);

export const verifyEmail = (data) =>
  axiosInstance.post('/auth/verify-email', data);

export const setPassword = (data) =>
  axiosInstance.post('/auth/set-password', data);

export const verifyToken = () => axiosInstance.get('/auth/verify-token');
