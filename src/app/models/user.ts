export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  createdAt?: Date;
  isAdmin?: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}
