import bcrypt from "bcrypt";
import { IPasswordService } from "./password-service.interface";
import { injectable } from "tsyringe";

@injectable()
export default class PasswordService implements IPasswordService {
  private readonly saltRounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
