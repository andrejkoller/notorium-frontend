import type { User } from "../models/User";
import axiosInstance from "./AxiosInstance";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get("/current", {
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
