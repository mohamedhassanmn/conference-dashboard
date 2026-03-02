import { Knex } from "knex";
import {
  Submission,
  SubmissionAuthor,
  CreateSubmissionDTO,
  CreateAuthorDTO,
  UpdateSubmissionDTO,
  SubmissionFileDTO,
  SubmissionStatus,
} from "../models/submission.model";

export interface ISubmissionDataSource {
  findByUserId(
    user_id: number,
    trx?: Knex.Transaction,
  ): Promise<Submission | null>;
  findById(
    submission_id: number,
    trx?: Knex.Transaction,
  ): Promise<Submission | null>;
  create(
    user_id: number,
    dto: CreateSubmissionDTO,
    trx?: Knex.Transaction,
  ): Promise<Submission>;
  update(
    submission_id: number,
    dto: UpdateSubmissionDTO,
    trx?: Knex.Transaction,
  ): Promise<Submission>;
  updateFiles(
    submission_id: number,
    dto: SubmissionFileDTO,
    trx?: Knex.Transaction,
  ): Promise<Submission>;
  updateStatus(
    submission_id: number,
    status: SubmissionStatus,
    trx?: Knex.Transaction,
  ): Promise<Submission>;
  existsByUserId(user_id: number, trx?: Knex.Transaction): Promise<boolean>;
  findAuthors(
    submission_id: number,
    trx?: Knex.Transaction,
  ): Promise<SubmissionAuthor[]>;
  replaceAuthors(
    submission_id: number,
    authors: CreateAuthorDTO[],
    trx?: Knex.Transaction,
  ): Promise<SubmissionAuthor[]>;
}
