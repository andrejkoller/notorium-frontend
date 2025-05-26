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

    console.log("Fetched all sheet music successfully", response.data);
    return response.data as SheetMusic[];
  } catch (error) {
    console.error("Error fetching all sheet music:", error);
    throw error;
  }
};
