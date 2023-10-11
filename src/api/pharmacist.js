import { axiosInstance } from './config';

export const getPharmacists = () => axiosInstance.get('/pharmacist');

export const getDetailsPharmacist = (regNumber) =>
  axiosInstance.get(`/pharmacist/reg/${regNumber}`);

export const addPharmacist = (data) => axiosInstance.post('/pharmacist', data);

export const deletePharmacist = (regNumber) =>
  axiosInstance.delete(`/pharmacist/reg/${regNumber}`);
