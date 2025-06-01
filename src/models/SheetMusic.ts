import type { User } from "./User";

export interface SheetMusic {
  id: number;
  title: string;
  composer: string;
  genre: Genre;
  instrument: Instrument;
  difficulty: Difficulty;
  description: string;
  previewImage: string;
  file: File;
  fileName: string;
  filePath: string;
  uploadedAt: Date;
  isPublic: boolean;
  downloads: number;
  favorites: number;
  views: number;
  userId: number;
  user: User;
}

export type Genre =
  | "Classical"
  | "Jazz"
  | "Rock"
  | "Pop"
  | "Blues"
  | "Folk"
  | "Country"
  | "Electronic"
  | "Reggae"
  | "Metal"
  | "Soundtrack"
  | "ModernClassical";

export type Instrument =
  | "Piano"
  | "Guitar"
  | "Violin"
  | "Flute"
  | "Trumpet"
  | "Drums"
  | "Saxophone"
  | "Cello"
  | "Clarinet"
  | "Trombone";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
