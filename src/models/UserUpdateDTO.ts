import type { Role } from "./User";

export interface UserUpdateDTO {
  name: string;
  email: string;
  username: string;
  description?: string;
  role?: Role;
}
