import type { Genre, SheetMusic } from "./sheet-music";

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  description?: string;
  profileImage?: string;
  bannerImage?: string;
  activatedGenre?: Genre;
  role: Role;
  token: string;
  sheetMusic?: SheetMusic[];
  favoriteSheetMusic?: SheetMusic[];
}

export interface UserResponse {
  user: User;
  token: string;
}

export type Role = "User" | "Admin";
