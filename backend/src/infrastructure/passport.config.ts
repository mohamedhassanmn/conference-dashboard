import { injectable, inject } from "tsyringe";
import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { IPassportConfig } from "./passport-config.interface";
import { IUserAuthService } from "../services/auth-service.interface";
import { IUserRepository } from "../repositories/user-repository.interface";
import { JwtPayload } from "../services/jwt-service.interface";
import { Tokens } from "../container/tokens";

@injectable()
export default class PassportConfig implements IPassportConfig {
  constructor(
    @inject(Tokens.AuthService) private readonly authService: IUserAuthService,
    @inject(Tokens.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(Tokens.JwtSecret) private readonly jwtSecret: string,
  ) {}

  init(passport: PassportStatic): void {
    this.useLocalStrategy(passport);
    this.useJwtStrategy(passport);
  }

  private useLocalStrategy(passport: PassportStatic): void {
    passport.use(
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          try {
            const result = await this.authService.login(email, password);
            return done(null, result.user);
          } catch (err) {
            return done(null, false, { message: (err as Error).message });
          }
        },
      ),
    );
  }

  private useJwtStrategy(passport: PassportStatic): void {
    passport.use(
      new JwtStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: this.jwtSecret,
        },
        async (payload: JwtPayload, done) => {
          try {
            const userId = parseInt(payload.sub, 10);
            const user = await this.userRepository.getById(userId);
            if (!user) return done(null, false);
            return done(null, user);
          } catch (err) {
            return done(err, false);
          }
        },
      ),
    );
  }
}
