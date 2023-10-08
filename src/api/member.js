import { axiosInstance } from './config';

// export const getCommittees = () => axiosInstance.get('/committee');

// export const getDetailsCommittee = (committeePath) =>
//   axiosInstance.get(`/committee/${committeePath}`);

export const addMember = (data) => axiosInstance.post('/member', data);

// export const deleteMember = (committeePath) =>
//   axiosInstance.delete(`/member/${committeePath}`);
