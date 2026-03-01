import { inject, injectable } from "tsyringe";
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { IJwtService, JwtPayload } from "./jwt-service.interface";
import { Tokens } from "../container/tokens";

@injectable()
export default class JwtService implements IJwtService {
  private readonly expiresIn: SignOptions["expiresIn"] = "1h";

  constructor(@inject(Tokens.JwtSecret) private readonly secret: Secret) {}

  sign(payload: JwtPayload): string {
    const options: SignOptions = { expiresIn: this.expiresIn };
    return jwt.sign(payload as object, this.secret, options);
  }

  verify(token: string): JwtPayload {
    const decoded = jwt.verify(token, this.secret);
    if (typeof decoded === "string") {
      throw new Error("Invalid token payload");
    }
    return decoded as JwtPayload;
  }
}
