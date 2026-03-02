import { Knex } from "knex";
import { injectable, inject } from "tsyringe";
import { Tokens } from "../container/tokens";
import {
  Submission,
  SubmissionAuthor,
  CreateSubmissionDTO,
  CreateAuthorDTO,
  UpdateSubmissionDTO,
  SubmissionFileDTO,
  SubmissionStatus,
} from "../models/submission.model";
import { ISubmissionDataSource } from "./submission-datasource.interface";

@injectable()
export default class SubmissionDataSource implements ISubmissionDataSource {
  constructor(@inject(Tokens.Database) private readonly db: Knex) {}

  async findByUserId(
    user_id: number,
    trx?: Knex.Transaction,
  ): Promise<Submission | null> {
    const qb = trx ?? this.db;
    const row = await qb<Submission>("submissions").where({ user_id }).first();
    return row ?? null;
  }

  async findById(
    submission_id: number,
    trx?: Knex.Transaction,
  ): Promise<Submission | null> {
    const qb = trx ?? this.db;
    const row = await qb<Submission>("submissions")
      .where({ submission_id })
      .first();
    return row ?? null;
  }

  async create(
    user_id: number,
    dto: CreateSubmissionDTO,
    trx?: Knex.Transaction,
  ): Promise<Submission> {
    const qb = trx ?? this.db;
    const [row] = await qb<Submission>("submissions")
      .insert({ user_id, title: dto.title, keywords: dto.keywords })
      .returning("*");
    return row;
  }

  async update(
    submission_id: number,
    dto: UpdateSubmissionDTO,
    trx?: Knex.Transaction,
  ): Promise<Submission> {
    const qb = trx ?? this.db;
    const payload: Partial<Submission> = { updated_at: new Date() } as any;
    if (dto.title) payload.title = dto.title;
    if (dto.keywords) payload.keywords = dto.keywords;
    const [row] = await qb<Submission>("submissions")
      .where({ submission_id })
      .update(payload)
      .returning("*");
    return row;
  }

  async updateFiles(
    submission_id: number,
    dto: SubmissionFileDTO,
    trx?: Knex.Transaction,
  ): Promise<Submission> {
    const qb = trx ?? this.db;
    const [row] = await qb<Submission>("submissions")
      .where({ submission_id })
      .update({ ...dto, updated_at: new Date() })
      .returning("*");
    return row;
  }

  async updateStatus(
    submission_id: number,
    status: SubmissionStatus,
    trx?: Knex.Transaction,
  ): Promise<Submission> {
    const qb = trx ?? this.db;
    const data: any = {
      status,
      updated_at: new Date(),
      ...(status === "submitted" ? { submitted_at: new Date() } : {}),
    };
    const [row] = await qb<Submission>("submissions")
      .where({ submission_id })
      .update(data)
      .returning("*");
    return row;
  }

  async existsByUserId(
    user_id: number,
    trx?: Knex.Transaction,
  ): Promise<boolean> {
    const qb = trx ?? this.db;
    const row = await qb("submissions").where({ user_id }).first();
    return !!row;
  }

  async findAuthors(
    submission_id: number,
    trx?: Knex.Transaction,
  ): Promise<SubmissionAuthor[]> {
    const qb = trx ?? this.db;
    return qb<SubmissionAuthor>("submission_authors")
      .where({ submission_id })
      .orderBy("author_order");
  }

  async replaceAuthors(
    submission_id: number,
    authors: CreateAuthorDTO[],
    trx?: Knex.Transaction,
  ): Promise<SubmissionAuthor[]> {
    const qb = trx ?? this.db;
    await qb("submission_authors").where({ submission_id }).delete();
    if (authors.length === 0) return [];
    const rows = authors.map((a, i) => ({
      submission_id,
      ...a,
      webpage: a.webpage ?? null,
      author_order: i,
    }));
    return qb<SubmissionAuthor>("submission_authors")
      .insert(rows)
      .returning("*");
  }
}
