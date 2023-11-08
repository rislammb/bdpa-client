import { axiosInstance } from './config';

export const getUsers = () => axiosInstance.get('/user');

export const updateUserById = ({ id, data }) =>
  axiosInstance.patch(`/user/${id}`, data);

export const deleteUser = (id) => axiosInstance.delete(`/user/${id}`);
