export interface IEmailService {
  sendPasswordReset(email: string, token: string): Promise<void>;
}
