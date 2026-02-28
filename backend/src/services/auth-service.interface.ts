export interface IUserAuthService {
  login(email: string, password: string): Promise<any>;
}
