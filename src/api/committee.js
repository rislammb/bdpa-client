import { axiosInstance } from './config';

export const getCommittees = (payload) =>
  axiosInstance.get('/committee', { params: payload });

export const getDetailsCommittee = (committeePath) =>
  axiosInstance.get(`/committee/${committeePath}`);

export const getDetailsCommitteeById = (committeeId) =>
  axiosInstance.get(`/committee/id/${committeeId}`);

export const addCommittee = (data) => axiosInstance.post('/committee', data);

export const updateCommitteeByPath = ({ committeePath, data }) =>
  axiosInstance.patch(`/committee/${committeePath}`, data);

export const deleteCommittee = (committeePath) =>
  axiosInstance.delete(`/committee/${committeePath}`);
