import express, { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
import multer from "multer";
import { container } from "tsyringe";
import { Tokens } from "../container/tokens";
import { IRegisterController } from "../controllers/register-controller.interface";
import { ILoginController } from "../controllers/login-controller.interface";
import { IPasswordRestController } from "../controllers/password-reset-controller.interface";

const upload = multer({ storage: multer.memoryStorage() });

export default function authRouter(): Router {
  const router = express.Router();

  const registerController = container.resolve<IRegisterController>(
    Tokens.RegisterController,
  );
  const loginController = container.resolve<ILoginController>(
    Tokens.LoginController,
  );
  const passwordResetController = container.resolve<IPasswordRestController>(
    Tokens.PasswordResetController,
  );

  // POST /auth/register
  router.post("/register", (req: Request, res: Response) => {
    registerController.handleRequest(req, res);
  });

  // POST /auth/login
  router.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req: Request, res: Response) => {
      loginController.handleRequest(req, res);
    },
  );

  // POST /auth/forgot-password
  router.post("/forgot-password", (req: Request, res: Response) => {
    passwordResetController.handleRequest(req, res);
  });

  // POST /auth/reset-password
  router.post("/reset-password", (req: Request, res: Response) => {
    passwordResetController.handleResetPassword(req, res);
  });

  // POST /auth/logout
  router.post(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req: Request, res: Response, next: NextFunction) => {
      req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ message: "Logged out successfully" });
      });
    },
  );

  return router;
}
