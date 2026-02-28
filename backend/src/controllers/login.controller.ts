import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import { ILoginController } from "./login-controller.interface";
import { IJwtService } from "../services/jwt-service.interface";
import { Tokens } from "../container/tokens";
import { UserPublic } from "../models/user.model";

@injectable()
export default class LoginController implements ILoginController {
  constructor(
    @inject(Tokens.JwtService) private readonly jwtService: IJwtService,
  ) {}

  async handleRequest(req: Request, res: Response): Promise<void> {
    const user = req.user as UserPublic;

    req.login(user, { session: false }, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        res.sendStatus(500);
        return;
      }

      const token = this.jwtService.sign({
        sub: String(user.user_id),
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        message: "Login successful",
        user,
        token,
      });
    });
  }
}
