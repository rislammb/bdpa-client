import { axiosInstance } from './config';

export const getCommittees = async () => {
  try {
    const { data } = await axiosInstance.get('/committee');

    return data;
  } catch (e) {
    console.log('error => ', e);
  }
};

export const getDetailsCommittee = async (committeePath) => {
  try {
    const { data } = await axiosInstance.get(`/committee/${committeePath}`);

    return data;
  } catch (e) {
    console.log('error => ', e);
  }
};
