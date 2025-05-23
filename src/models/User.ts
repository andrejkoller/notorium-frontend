export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    password: string;
    token: string;
}

export interface UserResponse {
    user: User;
    token: string;
}