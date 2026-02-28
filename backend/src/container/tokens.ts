export const Tokens = {
  Database: Symbol("Database"),
  UserDataSource: Symbol("UserDataSource"),
  ServerConfig: Symbol("ServerConfig"),
  PassportConfig: Symbol("PassportConfig"),
  JwtSecret: Symbol("JwtSecret"),
  AuthService: Symbol("AuthService"),
  JwtService: Symbol("JwtService"),
  UserRepository: Symbol("UserRepository"),
  PasswordService: Symbol("PasswordService"),
  LoginController: Symbol("LoginController"),
  RegisterController: Symbol("RegisterController"),
  PasswordResetController: Symbol("PasswordResetController"),
} as const;
