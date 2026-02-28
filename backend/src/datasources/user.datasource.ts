import { injectable, inject } from "tsyringe";
import { Knex } from "knex";
import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  UserFilters,
  PaginationOptions,
  PaginatedResult,
} from "../models/user.model";
import { Tokens } from "../container/tokens";
import { IUserDataSource } from "./user-datasource.interface";

type QueryBuilder = Knex | Knex.Transaction;

@injectable()
export default class UserDataSource implements IUserDataSource {
  constructor(@inject(Tokens.Database) private readonly db: Knex) {}

  // ─── Single Lookups ──────────────────────────────────────────────────────────

  async findById(
    user_id: number,
    trx?: Knex.Transaction,
  ): Promise<User | null> {
    const qb: QueryBuilder = trx ?? this.db;
    const user = await qb<User>("users").where({ user_id }).first();
    return user ?? null;
  }

  async findByEmail(
    email: string,
    trx?: Knex.Transaction,
  ): Promise<User | null> {
    const qb: QueryBuilder = trx ?? this.db;
    const user = await qb<User>("users")
      .whereRaw("LOWER(email) = ?", [email.toLowerCase().trim()])
      .first();
    return user ?? null;
  }

  // ─── Collection Lookups ──────────────────────────────────────────────────────

  async findMany(
    filters: UserFilters = {},
    pagination: PaginationOptions = { page: 1, limit: 20 },
    trx?: Knex.Transaction,
  ): Promise<PaginatedResult<User>> {
    const qb: QueryBuilder = trx ?? this.db;
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;

    const query = qb<User>("users");

    if (filters.role !== undefined) query.where({ role: filters.role });
    if (filters.is_verified !== undefined)
      query.where({ is_verified: filters.is_verified });
    if (filters.is_active !== undefined)
      query.where({ is_active: filters.is_active });
    if (filters.region !== undefined) query.where({ region: filters.region });
    if (filters.search) {
      query.where((builder) =>
        builder
          .whereILike("first_name", `%${filters.search}%`)
          .orWhereILike("last_name", `%${filters.search}%`)
          .orWhereILike("email", `%${filters.search}%`),
      );
    }

    const [{ count }] = await query
      .clone()
      .count<[{ count: string }]>("user_id as count");
    const total = parseInt(count, 10);

    const data = await query
      .orderBy("created_at", "desc")
      .limit(limit)
      .offset(offset);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  // ─── Mutations ───────────────────────────────────────────────────────────────

  async create(dto: CreateUserDTO, trx?: Knex.Transaction): Promise<User> {
    const qb: QueryBuilder = trx ?? this.db;
    const [user] = await qb<User>("users")
      .insert({
        first_name: dto.first_name,
        last_name: dto.last_name,
        email: dto.email.toLowerCase().trim(),
        password_hash: dto.password_hash,
        affiliation: dto.affiliation ?? null,
        region: dto.region ?? null,
        role: dto.role ?? "user",
      })
      .returning("*");
    return user;
  }

  async update(
    user_id: number,
    dto: UpdateUserDTO,
    trx?: Knex.Transaction,
  ): Promise<User | null> {
    const qb: QueryBuilder = trx ?? this.db;

    const fields = Object.fromEntries(
      Object.entries(dto).filter(([, v]) => v !== undefined),
    );
    if (Object.keys(fields).length === 0) return this.findById(user_id, trx);

    const [user] = await qb<User>("users")
      .where({ user_id })
      .update({ ...fields, updated_at: this.db.fn.now() })
      .returning("*");
    return user ?? null;
  }

  async delete(user_id: number, trx?: Knex.Transaction): Promise<boolean> {
    const qb: QueryBuilder = trx ?? this.db;
    const count = await qb<User>("users").where({ user_id }).delete();
    return count > 0;
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  async exists(email: string, trx?: Knex.Transaction): Promise<boolean> {
    const qb: QueryBuilder = trx ?? this.db;
    const result = await qb<User>("users")
      .whereRaw("LOWER(email) = ?", [email.toLowerCase().trim()])
      .first();
    return !!result;
  }

  async setVerified(user_id: number, trx?: Knex.Transaction): Promise<void> {
    const qb: QueryBuilder = trx ?? this.db;
    await qb<User>("users")
      .where({ user_id })
      .update({ is_verified: true, updated_at: this.db.fn.now() });
  }

  async setLastLogin(user_id: number, trx?: Knex.Transaction): Promise<void> {
    const qb: QueryBuilder = trx ?? this.db;
    await qb<User>("users").where({ user_id }).update({
      last_login_at: this.db.fn.now(),
      updated_at: this.db.fn.now(),
    });
  }

  async deactivate(user_id: number, trx?: Knex.Transaction): Promise<void> {
    const qb: QueryBuilder = trx ?? this.db;
    await qb<User>("users")
      .where({ user_id })
      .update({ is_active: false, updated_at: this.db.fn.now() });
  }

  // ─── Transaction Helper ───────────────────────────────────────────────────────

  async withTransaction<T>(
    fn: (trx: Knex.Transaction) => Promise<T>,
  ): Promise<T> {
    return this.db.transaction(fn);
  }
}
