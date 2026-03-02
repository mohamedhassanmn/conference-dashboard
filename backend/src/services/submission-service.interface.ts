import {
  CreateSubmissionDTO,
  SubmissionFull,
  UpdateSubmissionDTO,
} from "../models/submission.model";

export interface ISubmissionService {
  getMySubmission(user_id: number): Promise<SubmissionFull | null>;
  createSubmission(
    user_id: number,
    dto: CreateSubmissionDTO,
  ): Promise<SubmissionFull>;
  updateSubmission(
    user_id: number,
    dto: UpdateSubmissionDTO,
  ): Promise<SubmissionFull>;
  uploadAbstract(
    user_id: number,
    buffer: Buffer,
    mimeType: string,
    originalName: string,
  ): Promise<SubmissionFull>;
  uploadSupplementary(
    user_id: number,
    buffer: Buffer,
    mimeType: string,
    originalName: string,
  ): Promise<SubmissionFull>;
  getAbstractUrl(user_id: number): Promise<string>;
  getSupplementaryUrl(user_id: number): Promise<string>;
  submitSubmission(user_id: number): Promise<SubmissionFull>;
  withdrawSubmission(user_id: number): Promise<SubmissionFull>;
}
