export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  affiliation: string | null;
  region: string | null;
  email: string;
  password_hash: string;
  is_verified: boolean;
  is_active: boolean;
  role: UserRole;
  last_login_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export type UserRole = "user" | "admin" | "moderator";

// What gets returned to the client (no sensitive fields)
export type UserPublic = Omit<User, "password_hash">;

// For creating a new user
export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  affiliation?: string;
  region?: string;
  role?: UserRole;
}

// For updating a user (all fields optional)
export interface UpdateUserDTO {
  first_name?: string;
  last_name?: string;
  affiliation?: string;
  region?: string;
  email?: string;
  password_hash?: string;
  is_verified?: boolean;
  is_active?: boolean;
  role?: UserRole;
  last_login_at?: Date;
}

export interface UserFilters {
  role?: UserRole;
  is_verified?: boolean;
  is_active?: boolean;
  region?: string;
  search?: string; // searches first_name, last_name, email
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
