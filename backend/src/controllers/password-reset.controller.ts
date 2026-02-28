import Joi from "joi";
import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import { IPasswordRestController } from "./password-reset-controller.interface";
import { IUserRepository } from "../repositories/user-repository.interface";
import { IPasswordService } from "../services/password-service.interface";
import { IJwtService } from "../services/jwt-service.interface";
import { Tokens } from "../container/tokens";

@injectable()
export default class PasswordResetController implements IPasswordRestController {
  constructor(
    @inject(Tokens.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(Tokens.PasswordService)
    private readonly passwordService: IPasswordService,
    @inject(Tokens.JwtService) private readonly jwtService: IJwtService,
  ) {}

  // POST /auth/forgot-password
  // Validates email exists and issues a short-lived reset token
  async handleRequest(req: Request, res: Response): Promise<void> {
    const { error, value } = Joi.object({
      email: Joi.string().email().required(),
    }).validate(req.body, { stripUnknown: true });

    if (error) {
      res.status(400).json({ message: "Validation failed", errors: error });
      return;
    }

    // Always respond with 200 even if email not found — prevents user enumeration
    const exists = await this.userRepository.emailExists(value.email);
    if (!exists) {
      res.status(200).json({
        message: "If that email exists you will receive a reset link",
      });
      return;
    }

    const user = await this.userRepository.getByEmail(value.email);

    const resetToken = this.jwtService.sign({
      sub: String(user.user_id),
      email: user.email,
      role: user.role,
    });

    // TODO: send resetToken via email service
    // For now return it directly (remove in production)
    res.status(200).json({
      message: "If that email exists you will receive a reset link",
      resetToken, // ← remove this in production, send via email instead
    });
  }

  // POST /auth/reset-password
  // Validates reset token and updates password
  async handleResetPassword(req: Request, res: Response): Promise<void> {
    const { error, value } = Joi.object({
      token: Joi.string().required(),
      password: Joi.string().min(8).required(),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords do not match",
        }),
    }).validate(req.body, { stripUnknown: true });

    if (error) {
      res.status(400).json({ message: "Validation failed", errors: error });
      return;
    }

    // Verify the reset token
    let payload;
    try {
      payload = this.jwtService.verify(value.token);
    } catch {
      res.status(401).json({ message: "Invalid or expired reset token" });
      return;
    }

    const userId = parseInt(payload.sub, 10);
    const password_hash = await this.passwordService.hash(value.password);

    await this.userRepository.update(userId, { password_hash });

    res.status(200).json({ message: "Password reset successfully" });
  }
}
