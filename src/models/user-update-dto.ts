import type { Role } from "./user";

export interface UserUpdateDTO {
  name: string;
  email: string;
  username: string;
  description?: string;
  role?: Role;
}
