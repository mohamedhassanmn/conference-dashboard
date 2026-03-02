import { injectable, inject } from "tsyringe";
import { Tokens } from "../container/tokens";
import SubmissionRepository from "../repositories/submission.repository";
import { IStorageService } from "./storage.service.interface";
import {
  SubmissionFull,
  CreateSubmissionDTO,
  UpdateSubmissionDTO,
} from "../models/submission.model";
import { v4 as uuid } from "uuid";
import { ISubmissionService } from "./submission-service.interface";

const BUCKET = "submissions";

@injectable()
export default class SubmissionService implements ISubmissionService {
  constructor(
    private readonly repo: SubmissionRepository,
    @inject(Tokens.StorageService) private readonly storage: IStorageService,
  ) {}

  async getMySubmission(user_id: number): Promise<SubmissionFull | null> {
    return this.repo.getByUserId(user_id);
  }

  async createSubmission(
    user_id: number,
    dto: CreateSubmissionDTO,
  ): Promise<SubmissionFull> {
    return this.repo.create(user_id, dto);
  }

  async updateSubmission(
    user_id: number,
    dto: UpdateSubmissionDTO,
  ): Promise<SubmissionFull> {
    return this.repo.update(user_id, dto);
  }

  async uploadAbstract(
    user_id: number,
    buffer: Buffer,
    mimeType: string,
    originalName: string,
  ): Promise<SubmissionFull> {
    const ext = originalName.split(".").pop() ?? "pdf";
    const key = `user-${user_id}/abstract-${uuid()}.${ext}`;
    await this.storage.uploadFile(BUCKET, key, buffer, mimeType);
    return this.repo.updateFiles(user_id, { abstract_file_key: key });
  }

  async uploadSupplementary(
    user_id: number,
    buffer: Buffer,
    mimeType: string,
    originalName: string,
  ): Promise<SubmissionFull> {
    const ext = originalName.split(".").pop() ?? "pdf";
    const key = `user-${user_id}/supplementary-${uuid()}.${ext}`;
    await this.storage.uploadFile(BUCKET, key, buffer, mimeType);
    return this.repo.updateFiles(user_id, { supplementary_file_key: key });
  }

  async getAbstractUrl(user_id: number): Promise<string> {
    const sub = await this.repo.getByUserId(user_id);
    if (!sub?.abstract_file_key) throw new Error("No abstract uploaded");
    return this.storage.getPresignedUrl(BUCKET, sub.abstract_file_key);
  }

  async getSupplementaryUrl(user_id: number): Promise<string> {
    const sub = await this.repo.getByUserId(user_id);
    if (!sub?.supplementary_file_key)
      throw new Error("No supplementary file uploaded");
    return this.storage.getPresignedUrl(BUCKET, sub.supplementary_file_key);
  }

  async submitSubmission(user_id: number): Promise<SubmissionFull> {
    return this.repo.submit(user_id);
  }

  async withdrawSubmission(user_id: number): Promise<SubmissionFull> {
    return this.repo.withdraw(user_id);
  }
}
