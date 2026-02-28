import Joi from "joi";
import { injectable, inject } from "tsyringe";
import { Request, Response } from "express";
import { IRegisterController } from "./register-controller.interface";
import { IPasswordService } from "../services/password-service.interface";
import { IUserRepository } from "../repositories/user-repository.interface";
import { CreateUserDTO } from "../models/user.model";
import { Tokens } from "../container/tokens";

interface RegisterBody {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  affiliation?: string;
  region?: string;
  role?: string;
}

@injectable()
export default class RegisterController implements IRegisterController {
  private inputSchema: Joi.ObjectSchema | null = null;

  constructor(
    @inject(Tokens.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(Tokens.PasswordService)
    private readonly passwordService: IPasswordService,
  ) {}

  async handleRequest(req: Request, res: Response): Promise<void> {
    // 1. Validate input
    const { isValid, validatedInput, validationError } = this.validateInput(
      req.body,
    );
    if (!isValid) {
      res
        .status(400)
        .json({ message: "Validation failed", errors: validationError });
      return;
    }

    // 2. Check email is not already taken
    const exists = await this.userRepository.emailExists(validatedInput.email);
    if (exists) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    // 3. Hash password
    const password_hash = await this.passwordService.hash(
      validatedInput.password,
    );

    // 4. Build DTO and create user
    const dto: CreateUserDTO = {
      first_name: validatedInput.first_name,
      last_name: validatedInput.last_name,
      email: validatedInput.email,
      password_hash,
      affiliation: validatedInput.affiliation,
      region: validatedInput.region,
      role: (validatedInput.role as CreateUserDTO["role"]) ?? "user",
    };

    const user = await this.userRepository.create(dto);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  }

  private getInputSchema(): Joi.ObjectSchema {
    if (this.inputSchema) return this.inputSchema;

    this.inputSchema = Joi.object<RegisterBody>({
      first_name: Joi.string().max(100).required(),
      last_name: Joi.string().max(100).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      affiliation: Joi.string().max(255).optional(),
      region: Joi.string().max(100).optional(),
      role: Joi.string().valid("user", "admin", "moderator").default("user"),
    });

    return this.inputSchema;
  }

  private validateInput(input: unknown): {
    isValid: boolean;
    validatedInput: RegisterBody;
    validationError: Joi.ValidationError | undefined;
  } {
    const { error, value } = this.getInputSchema().validate(input, {
      abortEarly: false, // return all errors at once not just the first
      stripUnknown: true, // strip any fields not in the schema
    });

    return {
      isValid: !error,
      validatedInput: value,
      validationError: error,
    };
  }
}
