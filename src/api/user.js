import { axiosInstance } from './config';

export const getUsers = () => axiosInstance.get('/user');

export const updateUserById = ({ committeePath, data }) =>
  axiosInstance.patch(`/user/${committeePath}`, data);

export const deleteUser = (committeePath) =>
  axiosInstance.delete(`/user/${committeePath}`);
