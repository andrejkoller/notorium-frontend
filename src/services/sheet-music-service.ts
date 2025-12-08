import type { SheetMusic } from "../models/sheet-music";
import axiosInstance from "./axios-instance";

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

export const deleteSheetMusic = async (id: number): Promise<void> => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to delete sheet music");
    }
  } catch (error) {
    console.error(`Error deleting sheet music with ID ${id}:`, error);
    throw error;
  }
};

export const filterSheetMusicByGenre = async (
  genre: string
): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/bygenre?genre=${encodeURIComponent(genre)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error(`Error fetching sheet music for genre ${genre}:`, error);
    throw error;
  }
};

export const filterSheetMusicByDifficulty = async (
  difficulty: string
): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/bydifficulty?difficulty=${encodeURIComponent(difficulty)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error(
      `Error fetching sheet music for difficulty ${difficulty}:`,
      error
    );
    throw error;
  }
};

export const filterSheetMusicByInstrument = async (
  instrument: string
): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/byinstrument?instrument=${encodeURIComponent(instrument)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error(
      `Error fetching sheet music for instrument ${instrument}:`,
      error
    );
    throw error;
  }
};

export const filterSheetMusicByUploadDate = async (
  isOrderByDescending: boolean
): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/byuploaddate?isOrderByDescending=${isOrderByDescending}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error(
      `Error fetching sheet music by upload date (descending: ${isOrderByDescending}):`,
      error
    );
    throw error;
  }
};

export const searchSheetMusic = async (
  query: string
): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error(`Error searching sheet music with query "${query}":`, error);
    throw error;
  }
};

export const getSheetMusicFavorites = async (
  userId: number
): Promise<SheetMusic[]> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/${userId}/favorites`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format");
    }

    return response.data as SheetMusic[];
  } catch (error) {
    console.error(`Error fetching favorites for user ID ${userId}:`, error);
    throw error;
  }
};

export const addSheetMusicToFavorites = async (
  sheetMusicId: number,
  userId: number
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/favorite/${sheetMusicId}`,
      { sheetMusicId, userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to add sheet music to favorites");
    }
  } catch (error) {
    console.error(
      `Error adding sheet music ID ${sheetMusicId} to favorites for user ID ${userId}:`,
      error
    );
    throw error;
  }
};

export const removeSheetMusicFromFavorites = async (
  sheetMusicId: number,
  userId: number
): Promise<void> => {
  try {
    const response = await axiosInstance.delete(
      `${BASE_URL}/favorite/${sheetMusicId}`,
      {
        data: { userId },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to remove sheet music from favorites");
    }
  } catch (error) {
    console.error(
      `Error removing sheet music ID ${sheetMusicId} from favorites for user ID ${userId}:`,
      error
    );
    throw error;
  }
};

export const downloadSheetMusic = async (
  sheetMusicId: number
): Promise<Blob> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/${sheetMusicId}/download`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to download sheet music");
    }

    return response.data as Blob;
  } catch (error) {
    console.error(`Error downloading sheet music ID ${sheetMusicId}`, error);
    throw error;
  }
};

export const printSheetMusic = async (sheetMusicId: number): Promise<Blob> => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/${sheetMusicId}/print`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to print sheet music");
    }

    return response.data as Blob;
  } catch (error) {
    console.error(`Error printing sheet music ID ${sheetMusicId}:`, error);
    throw error;
  }
};
