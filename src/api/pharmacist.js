import { axiosInstance } from './config';

export const getPharmacists = (payload) =>
  axiosInstance.get('/pharmacist', { params: payload });

export const getDetailsPharmacist = (regNumber) =>
  axiosInstance.get(`/pharmacist/reg/${regNumber}`);

export const addPharmacist = (data) => axiosInstance.post('/pharmacist', data);

export const updatePharmacist = ({ regNumber, data }) =>
  axiosInstance.patch(`/pharmacist/reg/${regNumber}`, data);

export const deletePharmacist = (regNumber) =>
  axiosInstance.delete(`/pharmacist/reg/${regNumber}`);
