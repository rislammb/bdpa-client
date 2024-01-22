import { axiosInstance } from './config';

export const addMember = (data) => axiosInstance.post('/member', data);

export const updateMemberById = ({ memberId, data }) =>
  axiosInstance.patch(`/member/m/${memberId}`, data);

export const deleteMemberById = (memberId) =>
  axiosInstance.delete(`/member/m/${memberId}`);
