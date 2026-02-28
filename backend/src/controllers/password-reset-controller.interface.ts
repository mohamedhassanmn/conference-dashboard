import { Request, Response } from "express";

export interface IPasswordRestController {
  handleRequest(req: Request, res: Response): Promise<void>;
  handleResetPassword(req: Request, res: Response): Promise<void>;
}
