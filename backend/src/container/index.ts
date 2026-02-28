// container/index.ts
import "reflect-metadata";
import { container } from "tsyringe";
import { Tokens } from "./tokens";
import db from "../datasources/database";

// Infrastructure
import UserDataSource from "../datasources/user.datasource";
import UserRepository from "../repositories/user.repository";

// Services
import PasswordService from "../services/password.service";
import JwtService from "../services/jwt.service";
import AuthService from "../services/auth.service";

// Infrastructure
import PassportConfig from "../infrastructure/passport.config";

// Controllers
import LoginController from "../controllers/login.controller";
import RegisterController from "../controllers/register.controller";
import PasswordResetController from "../controllers/password-reset.controller";
import { mapClass, mapInstance, mapValue } from "./utils";
import { serverConfigs } from "../config/server-config";

// ─── Register in dependency order (dependencies before dependents) ────────────

// 1. Database
mapInstance(Tokens.Database, db);

// 2. DataSource
mapClass(Tokens.UserDataSource, UserDataSource);

// 3. Repository
mapClass(Tokens.UserRepository, UserRepository);

// 4. Services
mapValue(Tokens.JwtSecret, process.env.JWT_SECRET ?? "changeme");
mapClass(Tokens.PasswordService, PasswordService);
mapClass(Tokens.JwtService, JwtService);
mapClass(Tokens.AuthService, AuthService);

// 5. Infrastructure
mapClass(Tokens.PassportConfig, PassportConfig);

// 6. Controllers
mapClass(Tokens.LoginController, LoginController);
mapClass(Tokens.RegisterController, RegisterController);
mapClass(Tokens.PasswordResetController, PasswordResetController);

//7.Config
mapValue(Tokens.ServerConfig, serverConfigs);

export { container };
