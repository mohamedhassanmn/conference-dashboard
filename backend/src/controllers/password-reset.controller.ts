import Joi from "joi";
import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import { IPasswordResetController } from "./password-reset-controller.interface";
import { IUserRepository } from "../repositories/user-repository.interface";
import { IPasswordService } from "../services/password-service.interface";
import { IJwtService } from "../services/jwt-service.interface";
import { IEmailService } from "../services/email-service.interface";
import { Tokens } from "../container/tokens";

@injectable()
export default class PasswordResetController implements IPasswordResetController {
  constructor(
    @inject(Tokens.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(Tokens.PasswordService)
    private readonly passwordService: IPasswordService,
    @inject(Tokens.JwtService) private readonly jwtService: IJwtService,
    @inject(Tokens.EmailService) private readonly emailService: IEmailService,
  ) {}

  async handleRequest(req: Request, res: Response): Promise<void> {
    const { error, value } = Joi.object({
      email: Joi.string().email().required(),
    }).validate(req.body, { stripUnknown: true });

    if (error) {
      res.status(400).json({ message: "Validation failed", errors: error });
      return;
    }

    const exists = await this.userRepository.emailExists(value.email);
    if (!exists) {
      // always 200 to prevent user enumeration
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

    // send email with reset link
    await this.emailService.sendPasswordReset(user.email, resetToken);

    res
      .status(200)
      .json({ message: "If that email exists you will receive a reset link" });
  }

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
