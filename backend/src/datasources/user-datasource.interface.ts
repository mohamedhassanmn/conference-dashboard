import { Knex } from "knex";
import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  UserFilters,
  PaginationOptions,
  PaginatedResult,
} from "../models/user.model";

export interface IUserDataSource {
  // ─── Single Lookups ──────────────────────────────────────────────────────────
  findById(user_id: number, trx?: Knex.Transaction): Promise<User | null>;
  findByEmail(email: string, trx?: Knex.Transaction): Promise<User | null>;

  // ─── Collection Lookups ──────────────────────────────────────────────────────
  findMany(
    filters?: UserFilters,
    pagination?: PaginationOptions,
    trx?: Knex.Transaction,
  ): Promise<PaginatedResult<User>>;

  // ─── Mutations ───────────────────────────────────────────────────────────────
  create(dto: CreateUserDTO, trx?: Knex.Transaction): Promise<User>;
  update(
    user_id: number,
    dto: UpdateUserDTO,
    trx?: Knex.Transaction,
  ): Promise<User | null>;
  delete(user_id: number, trx?: Knex.Transaction): Promise<boolean>;

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  exists(email: string, trx?: Knex.Transaction): Promise<boolean>;
  setVerified(user_id: number, trx?: Knex.Transaction): Promise<void>;
  setLastLogin(user_id: number, trx?: Knex.Transaction): Promise<void>;
  deactivate(user_id: number, trx?: Knex.Transaction): Promise<void>;

  // ─── Transaction Helper ───────────────────────────────────────────────────────
  withTransaction<T>(fn: (trx: Knex.Transaction) => Promise<T>): Promise<T>;
}
