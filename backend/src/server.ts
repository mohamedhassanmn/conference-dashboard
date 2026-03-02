import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { DependencyContainer } from "tsyringe";
import healthCheck from "./middlewares/health-check.middleware";
import exceptionHandler from "./middlewares/exception-error-handler.middleware";
import handleAuthentication from "./middlewares/authentication.middleware";
import { IPassportConfig } from "./infrastructure/passport-config.interface";
import { Tokens } from "./container/tokens";
import authRouter from "./routes/auth.routes";
import submissionRouter from "./routes/submission.routes";

export const server = async (
  container: DependencyContainer,
): Promise<express.Application> => {
  const app = express();
  app.use(express.json({ limit: "10mb", strict: false }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: (origin, callback) => {
        console.log("Incoming Request Origin:", origin);
        const whitelist = [
          "http://localhost:4000",
          "https://dashboard-icpp2026.iitd.ac.in",
        ];
        if (!origin || whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"), false);
        }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: [
        "content-type",
        "credentials",
        "authorization",
        "accesstoken",
      ],
    }),
  );
  app.use(healthCheck());
  try {
    const passportConfig = container.resolve<IPassportConfig>(
      Tokens.PassportConfig,
    );
    passportConfig.init(passport); // registers strategies once
  } catch (err) {
    console.error("Failed to initialize Passport", err);
    process.exit(1); // fail fast
  }
  app.use(passport.initialize());
  app.use("/auth", authRouter());
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).send("Hello from ICPP2026 service!");
  });
  app.use(handleAuthentication()); // global auth middleware, applied after public routes
  app.use("/submissions", submissionRouter());
  app.use(exceptionHandler());

  return app;
};
