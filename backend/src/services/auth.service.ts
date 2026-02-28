import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/user-repository.interface";
import { IUserAuthService } from "./auth-service.interface";
import { IPasswordService } from "./password-service.interface";
import { IJwtService } from "./jwt-service.interface";
import { Tokens } from "../container/tokens";
import { UserPublic } from "../models/user.model";

export interface AuthResult {
  token: string;
  user: UserPublic;
}

@injectable()
export default class AuthService implements IUserAuthService {
  constructor(
    @inject(Tokens.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(Tokens.PasswordService)
    private readonly passwordService: IPasswordService,
    @inject(Tokens.JwtService) private readonly jwtService: IJwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthResult> {
    const user = await this.userRepository.getByEmailWithPassword(email);
    if (!user) throw new Error("Invalid email");

    const isMatch = await this.passwordService.compare(
      password,
      user.password_hash,
    );
    if (!isMatch) throw new Error("Invalid password");

    await this.userRepository.recordLogin(user.user_id);

    const token = this.jwtService.sign({
      sub: String(user.user_id),
      email: user.email,
      role: user.role,
    });

    const { password_hash, ...safeUser } = user;
    return { token, user: safeUser };
  }
}
