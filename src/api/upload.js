import { axiosInstance } from "./config";

export const uploadMainImage = (regNumber, formData) =>
  axiosInstance.post(
    `/pharmacist/reg/${regNumber}/upload-main-image`,
    formData
  );

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${axiosInstance}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export const getFiles = async () => {
  try {
    const response = await fetch(`${axiosInstance}/files`);
    if (!response.ok) {
      throw new Error("Failed to fetch files");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const deleteFile = async (publicId) => {
  try {
    const response = await fetch(`${axiosInstance}/files/${publicId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};
