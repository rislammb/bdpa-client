import { axiosInstance } from "./config";

export const uploadMainImage = (regNumber, formData) =>
  axiosInstance.post(
    `/pharmacist/reg/${regNumber}/upload-main-image`,
    formData
  );

export const deleteMainImage = (regNumber, displayName) =>
  axiosInstance.delete(`/pharmacist/files/${regNumber}/${displayName}`);
