import { Request, Response } from "express";

export interface ILoginController {
  handleRequest(req: Request, res: Response): Promise<void>;
}
