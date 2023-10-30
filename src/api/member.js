import { axiosInstance } from './config';

// export const getCommittees = () => axiosInstance.get('/committee');

// export const getDetailsCommittee = (committeePath) =>
//   axiosInstance.get(`/committee/${committeePath}`);

export const addMember = (data) => axiosInstance.post('/member', data);

export const updateMemberById = ({ memberId, data }) =>
  axiosInstance.patch(`/member/m/${memberId}`, data);

export const deleteMemberById = (memberId) =>
  axiosInstance.delete(`/member/m/${memberId}`);
