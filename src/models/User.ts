export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  description?: string;
  role: Role;
  token: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export type Role = "User" | "Admin";
