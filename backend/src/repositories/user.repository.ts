import { injectable } from "tsyringe";
import UserDataSource from "../datasources/user.datasource";
import {
  User,
  UserPublic,
  CreateUserDTO,
  UpdateUserDTO,
  UserFilters,
  PaginationOptions,
  PaginatedResult,
} from "../models/user.model";
import { IUserRepository } from "./user-repository.interface";

@injectable()
export default class UserRepository implements IUserRepository {
  constructor(private readonly dataSource: UserDataSource) {}

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private sanitize(user: User): UserPublic {
    const { password_hash, ...safe } = user;
    return safe;
  }

  private sanitizeMany(users: User[]): UserPublic[] {
    return users.map(this.sanitize.bind(this));
  }

  // ─── Queries ─────────────────────────────────────────────────────────────────

  async getById(user_id: number): Promise<UserPublic> {
    const user = await this.dataSource.findById(user_id);
    if (!user) throw new Error(`User with id ${user_id} not found`);
    return this.sanitize(user);
  }

  async getByEmail(email: string): Promise<UserPublic> {
    const user = await this.dataSource.findByEmail(email);
    if (!user) throw new Error(`User with email ${email} not found`);
    return this.sanitize(user);
  }

  // Raw version used internally (e.g. auth — needs password_hash)
  async getByEmailWithPassword(email: string): Promise<User> {
    const user = await this.dataSource.findByEmail(email);
    if (!user) throw new Error(`User with email ${email} not found`);
    return user;
  }

  async getMany(
    filters: UserFilters = {},
    pagination: PaginationOptions = { page: 1, limit: 20 },
  ): Promise<PaginatedResult<UserPublic>> {
    const result = await this.dataSource.findMany(filters, pagination);
    return {
      ...result,
      data: this.sanitizeMany(result.data),
    };
  }

  async emailExists(email: string): Promise<boolean> {
    return this.dataSource.exists(email);
  }

  // ─── Mutations ───────────────────────────────────────────────────────────────

  async create(dto: CreateUserDTO): Promise<UserPublic> {
    const alreadyExists = await this.dataSource.exists(dto.email);
    if (alreadyExists) {
      throw new Error(`Email ${dto.email} is already registered`);
    }

    const user = await this.dataSource.create(dto);
    return this.sanitize(user);
  }

  async update(user_id: number, dto: UpdateUserDTO): Promise<UserPublic> {
    // If updating email, check it isn't already taken by another user
    if (dto.email) {
      const existing = await this.dataSource.findByEmail(dto.email);
      if (existing && existing.user_id !== user_id) {
        throw new Error(`Email ${dto.email} is already in use`);
      }
    }

    const updated = await this.dataSource.update(user_id, dto);
    if (!updated) throw new Error(`User with id ${user_id} not found`);
    return this.sanitize(updated);
  }

  async delete(user_id: number): Promise<void> {
    const deleted = await this.dataSource.delete(user_id);
    if (!deleted) throw new Error(`User with id ${user_id} not found`);
  }

  // ─── Domain Actions ───────────────────────────────────────────────────────────

  async verifyUser(user_id: number): Promise<void> {
    const user = await this.dataSource.findById(user_id);
    if (!user) throw new Error(`User with id ${user_id} not found`);
    if (user.is_verified) throw new Error(`User is already verified`);
    await this.dataSource.setVerified(user_id);
  }

  async recordLogin(user_id: number): Promise<void> {
    await this.dataSource.setLastLogin(user_id);
  }

  async deactivateUser(user_id: number): Promise<void> {
    const user = await this.dataSource.findById(user_id);
    if (!user) throw new Error(`User with id ${user_id} not found`);
    if (!user.is_active) throw new Error(`User is already inactive`);
    await this.dataSource.deactivate(user_id);
  }

  async activateUser(user_id: number): Promise<void> {
    const user = await this.dataSource.findById(user_id);
    if (!user) throw new Error(`User with id ${user_id} not found`);
    if (user.is_active) throw new Error(`User is already active`);
    await this.dataSource.activate(user_id);
  }

  async changeRole(user_id: number, role: User["role"]): Promise<UserPublic> {
    const updated = await this.dataSource.update(user_id, { role });
    if (!updated) throw new Error(`User with id ${user_id} not found`);
    return this.sanitize(updated);
  }
}
