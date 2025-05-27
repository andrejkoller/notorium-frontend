import type { SheetMusic } from "../models/SheetMusic";
import axiosInstance from "./AxiosInstance";

const BASE_URL = "https://localhost:7189/api/sheetmusic";

export const getAllSheetMusic = async (): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error("Error fetching all sheet music:", error);
    throw error;
  }
};

export const getCurrentUserSheetMusic = async (
  userId: number
): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error(`Error fetching sheet music for user ID ${userId}:`, error);
    throw error;
  }
};

export const getSheetMusicById = async (id: number): Promise<SheetMusic> => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Sheet music not found");
    }

    return response.data as SheetMusic;
  } catch (error) {
    console.error(`Error fetching sheet music with ID ${id}:`, error);
    throw error;
  }
};

export const uploadSheetMusic = async (data: FormData): Promise<unknown> => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/upload`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!response.data) {
      throw new Error("Failed to upload sheet music");
    }

    return response.data as SheetMusic;
  } catch (error) {
    console.error("Error uploading sheet music:", error);
    throw error;
  }
};
