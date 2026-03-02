import {
  SubmissionFull,
  CreateSubmissionDTO,
  UpdateSubmissionDTO,
  SubmissionFileDTO,
} from "../models/submission.model";

export interface ISubmissionRepository {
  getByUserId(user_id: number): Promise<SubmissionFull | null>;
  getById(submission_id: number): Promise<SubmissionFull | null>;
  create(user_id: number, dto: CreateSubmissionDTO): Promise<SubmissionFull>;
  update(user_id: number, dto: UpdateSubmissionDTO): Promise<SubmissionFull>;
  updateFiles(user_id: number, dto: SubmissionFileDTO): Promise<SubmissionFull>;
  submit(user_id: number): Promise<SubmissionFull>;
  withdraw(user_id: number): Promise<SubmissionFull>;
}
