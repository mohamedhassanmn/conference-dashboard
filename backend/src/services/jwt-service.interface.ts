import { JwtPayload as JwtBasePayload } from "jsonwebtoken";

export interface JwtPayload extends JwtBasePayload {
  sub: string;
  email: string;
  role: string;
}

export interface IJwtService {
  sign(payload: JwtPayload): string;
  verify(token: string): JwtPayload;
}
