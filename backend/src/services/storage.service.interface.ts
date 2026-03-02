export interface IStorageService {
  uploadFile(
    bucket: string,
    key: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<string>;

  getPresignedUrl(
    bucket: string,
    key: string,
    expirySeconds?: number,
  ): Promise<string>;
  deleteFile(bucket: string, key: string): Promise<void>;
  fileExists(bucket: string, key: string): Promise<boolean>;
}
