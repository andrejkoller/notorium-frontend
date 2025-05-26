export interface SheetMusic {
  id: number;
  title: string;
  composer: string;
  genre: Genre;
  instrument: Instrument;
  difficulty: Difficulty;
  description: string;
  fileName: string;
  filePath: string;
  uploadedAt: Date;
  isPublic: boolean;
  downloadCount: number;
  userId: number;
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
  | "Modern Classical";

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
