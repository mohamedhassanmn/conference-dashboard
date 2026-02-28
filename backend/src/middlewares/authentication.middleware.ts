import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { UserPublic } from "../models/user.model";

const PUBLIC_ROUTES = [
  { method: "POST", path: "/auth/login" },
  { method: "POST", path: "/auth/register" },
  { method: "POST", path: "/auth/forgot-password" },
  { method: "POST", path: "/auth/reset-password" },
];

export default function handleAuthentication() {
  return (req: Request, res: Response, next: NextFunction): void => {
    const isPublic = PUBLIC_ROUTES.some(
      (route) => route.method === req.method && route.path === req.path,
    );

    if (isPublic) {
      next();
      return;
    }

    passport.authenticate(
      "jwt",
      { session: false },
      (err: Error | null, user: UserPublic | false) => {
        if (err) return next(err);
        if (!user) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        req.user = user;
        next();
      },
    )(req, res, next);
  };
}
