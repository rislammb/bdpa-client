import { axiosInstance } from './config';

export const getUsers = (payload) =>
  axiosInstance.get('/user', { params: payload });

export const updateUserById = ({ id, data }) =>
  axiosInstance.patch(`/user/${id}`, data);

export const deleteUser = (id) => axiosInstance.delete(`/user/${id}`);
