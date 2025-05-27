export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  token: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export type Role = "User" | "Admin";
