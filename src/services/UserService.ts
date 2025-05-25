import type { User } from "../models/User";
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
