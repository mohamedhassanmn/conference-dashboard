import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import healthCheck from "./middlewares/healthCheck";
import exceptionHandler from "./middlewares/exceptionHandler";
import handleAuthentication from "./middlewares/authenticationHandler";

const server = (): Promise<express.Application> =>
  new Promise((resolve) => {
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: "10mb", strict: false }));
    app.use(morgan("dev"));
    app.use(
      cors({
        origin: (
          origin: string | undefined,
          callback: (err: Error | null, allow?: boolean) => void,
        ) => {
          const whitelist = ["http://localhost:4000"];
          console.log("REQUEST FROM ORIGIN: ", origin);
          if (!origin || whitelist.indexOf(origin) !== -1) {
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

    app.use(
      session({
        secret: "youdontgettoseethisisTIFRsecret",
        resave: false,
        saveUninitialized: false,
      }),
    );

    app.use(healthCheck());

    app.use(exceptionHandler());

    app.get("/", (_req: Request, res: Response) => {
      res.status(200).send("Hello from ICPP2026 service!");
    });

    app.use(handleAuthentication());

    // app.use("/service", router);

    resolve(app);
  });

export default server;
