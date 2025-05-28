import type { User } from "../models/User";
import type { UserUpdateDTO } from "../models/UserUpdateDTO";
import axiosInstance from "./AxiosInstance";

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

export const uploadProfilePicture = async (
  userId: number,
  formData: FormData
): Promise<User> => {
  try {
    const response = await axiosInstance.put(
      `${BASE_URL}/${userId}/uploadProfilePicture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw error;
  }
};
