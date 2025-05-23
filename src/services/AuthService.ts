import type { User, UserResponse } from "../models/User";
import axiosInstance from "./AxiosInstance";

const BASE_URL = "https://localhost:7189/api/auth";

export const register = async (
  name: string,
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): Promise<User> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/register`,
      {
        name,
        email,
        username,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
