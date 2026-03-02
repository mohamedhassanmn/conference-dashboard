import * as Minio from "minio";
import { injectable } from "tsyringe";
import { IStorageService } from "./storage.service.interface";

@injectable()
export default class StorageService implements IStorageService {
  private client: Minio.Client;

  constructor() {
    this.client = new Minio.Client({
      endPoint: process.env.MINIO_ENDPOINT ?? "minio",
      port: parseInt(process.env.MINIO_PORT ?? "9000"),
      useSSL: process.env.MINIO_USE_SSL === "true",
      accessKey: process.env.MINIO_ACCESS_KEY ?? "minioadmin",
      secretKey: process.env.MINIO_SECRET_KEY ?? "minioadmin",
    });
  }

  async uploadFile(
    bucket: string,
    key: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<string> {
    // Ensure bucket exists
    const exists = await this.client.bucketExists(bucket);
    if (!exists) await this.client.makeBucket(bucket);

    await this.client.putObject(bucket, key, buffer, buffer.length, {
      "Content-Type": mimeType,
    });

    return key;
  }

  async getPresignedUrl(
    bucket: string,
    key: string,
    expirySeconds = 3600,
  ): Promise<string> {
    return this.client.presignedGetObject(bucket, key, expirySeconds);
  }

  async deleteFile(bucket: string, key: string): Promise<void> {
    await this.client.removeObject(bucket, key);
  }

  async fileExists(bucket: string, key: string): Promise<boolean> {
    try {
      await this.client.statObject(bucket, key);
      return true;
    } catch {
      return false;
    }
  }
}
