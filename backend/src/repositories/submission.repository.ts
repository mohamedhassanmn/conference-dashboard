import { injectable, inject } from "tsyringe";
import { Knex } from "knex";
import { Tokens } from "../container/tokens";
import {
  Submission,
  SubmissionFull,
  CreateSubmissionDTO,
  UpdateSubmissionDTO,
  SubmissionFileDTO,
} from "../models/submission.model";
import { ISubmissionRepository } from "./submission-repository.interface";
import { ISubmissionDataSource } from "../datasources/submission-datasource.interface";

@injectable()
export default class SubmissionRepository implements ISubmissionRepository {
  constructor(
    @inject(Tokens.SubmissionDataSource)
    private readonly dataSource: ISubmissionDataSource,
    @inject(Tokens.Database) private readonly db: Knex,
  ) {}

  private async toFull(
    sub: Submission,
    trx?: Knex.Transaction,
  ): Promise<SubmissionFull> {
    const authors = await this.dataSource.findAuthors(sub.submission_id, trx);
    return { ...sub, authors };
  }

  async getByUserId(user_id: number): Promise<SubmissionFull | null> {
    const sub = await this.dataSource.findByUserId(user_id);
    if (!sub) return null;
    return this.toFull(sub);
  }

  async getById(submission_id: number): Promise<SubmissionFull | null> {
    const sub = await this.dataSource.findById(submission_id);
    if (!sub) return null;
    return this.toFull(sub);
  }

  async create(
    user_id: number,
    dto: CreateSubmissionDTO,
  ): Promise<SubmissionFull> {
    const exists = await this.dataSource.existsByUserId(user_id);
    if (exists) throw new Error("User already has a submission");
    if (!dto.authors || dto.authors.length === 0)
      throw new Error("At least one author is required");
    if (!dto.keywords || dto.keywords.length === 0)
      throw new Error("At least one keyword is required");

    return this.db.transaction(async (trx) => {
      const sub = await this.dataSource.create(user_id, dto, trx);
      await this.dataSource.replaceAuthors(sub.submission_id, dto.authors, trx);
      return this.toFull(sub, trx);
    });
  }

  async update(
    user_id: number,
    dto: UpdateSubmissionDTO,
  ): Promise<SubmissionFull> {
    const sub = await this.dataSource.findByUserId(user_id);
    if (!sub) throw new Error("Submission not found");
    if (sub.status === "submitted")
      throw new Error("Cannot edit a submitted submission");

    return this.db.transaction(async (trx) => {
      const updated = await this.dataSource.update(sub.submission_id, dto, trx);
      if (dto.authors) {
        if (dto.authors.length === 0)
          throw new Error("At least one author is required");
        await this.dataSource.replaceAuthors(
          sub.submission_id,
          dto.authors,
          trx,
        );
      }
      return this.toFull(updated, trx);
    });
  }

  async updateFiles(
    user_id: number,
    dto: SubmissionFileDTO,
  ): Promise<SubmissionFull> {
    const sub = await this.dataSource.findByUserId(user_id);
    if (!sub) throw new Error("Submission not found");
    const updated = await this.dataSource.updateFiles(sub.submission_id, dto);
    return this.toFull(updated);
  }

  async submit(user_id: number): Promise<SubmissionFull> {
    const sub = await this.dataSource.findByUserId(user_id);
    if (!sub) throw new Error("Submission not found");
    if (sub.status === "submitted") throw new Error("Already submitted");
    if (!sub.abstract_file_key)
      throw new Error("Abstract file is required before submitting");
    if (sub.keywords.length === 0)
      throw new Error("At least one keyword is required");

    const full = await this.toFull(sub);
    if (full.authors.length === 0)
      throw new Error("At least one author is required");

    const updated = await this.dataSource.updateStatus(
      sub.submission_id,
      "submitted",
    );
    return this.toFull(updated);
  }

  async withdraw(user_id: number): Promise<SubmissionFull> {
    const sub = await this.dataSource.findByUserId(user_id);
    if (!sub) throw new Error("Submission not found");
    if (sub.status !== "submitted")
      throw new Error("Can only withdraw a submitted submission");

    const updated = await this.dataSource.updateStatus(
      sub.submission_id,
      "withdrawn",
    );
    return this.toFull(updated);
  }
}
