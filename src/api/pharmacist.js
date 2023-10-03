import { axiosInstance } from './config';

export const getPharmacists = async () => {
  try {
    const { data } = await axiosInstance.get('/pharmacist');

    return data;
  } catch (e) {
    console.log('error => ', e);
  }
};

export const getDetailsPharmacist = async (regNumber) => {
  try {
    const { data } = await axiosInstance.get(`/pharmacist/${regNumber}`);

    return data;
  } catch (e) {
    console.log('error => ', e);
  }
};
