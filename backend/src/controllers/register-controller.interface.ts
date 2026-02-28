import { Request, Response } from "express";

export interface IRegisterController {
  handleRequest(req: Request, res: Response): Promise<void>;
}
