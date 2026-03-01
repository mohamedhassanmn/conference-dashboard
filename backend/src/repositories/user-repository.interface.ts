import {
  User,
  UserPublic,
  CreateUserDTO,
  UpdateUserDTO,
  UserFilters,
  PaginationOptions,
  PaginatedResult,
} from "../models/user.model";

export interface IUserRepository {
  // ─── Queries ─────────────────────────────────────────────────────────────────
  getById(user_id: number): Promise<UserPublic>;
  getByEmail(email: string): Promise<UserPublic>;
  getByEmailWithPassword(email: string): Promise<User>;
  getMany(
    filters?: UserFilters,
    pagination?: PaginationOptions,
  ): Promise<PaginatedResult<UserPublic>>;
  emailExists(email: string): Promise<boolean>;

  // ─── Mutations ───────────────────────────────────────────────────────────────
  create(dto: CreateUserDTO): Promise<UserPublic>;
  update(user_id: number, dto: UpdateUserDTO): Promise<UserPublic>;
  delete(user_id: number): Promise<void>;

  // ─── Domain Actions ───────────────────────────────────────────────────────────
  verifyUser(user_id: number): Promise<void>;
  recordLogin(user_id: number): Promise<void>;
  deactivateUser(user_id: number): Promise<void>;
  activateUser(user_id: number): Promise<void>;
  changeRole(user_id: number, role: User["role"]): Promise<UserPublic>;
}
