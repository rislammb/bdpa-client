import { axiosInstance } from './config';

export const userLogin = (credentials) =>
  axiosInstance.post('/auth/login', credentials);
