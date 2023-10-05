import { axiosInstance } from './config';

export const getCommittees = () => axiosInstance.get('/committee');

export const getDetailsCommittee = (committeePath) =>
  axiosInstance.get(`/committee/${committeePath}`);

export const addCommittee = (data) => axiosInstance.post('/committee', data);

export const deleteCommittee = (committeePath) =>
  axiosInstance.delete(`/committee/${committeePath}`);
