import type { User } from "../models/user";
import type { UserUpdateDTO } from "../models/user-update-dto";
import axiosInstance from "./axios-instance";

const BASE_URL = "https://localhost:7189/api/user";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/currentUser`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const updateUser = async (
  userId: number,
  user: UserUpdateDTO
): Promise<User> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_URL}/${userId}/update`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const uploadProfileImage = async (
  userId: number,
  formData: FormData
): Promise<User> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_URL}/${userId}/uploadProfileImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    throw error;
  }
};

export const uploadBannerImage = async (
  userId: number,
  formData: FormData
): Promise<User> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_URL}/${userId}/uploadBannerImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading banner image:", error);
    throw error;
  }
};
