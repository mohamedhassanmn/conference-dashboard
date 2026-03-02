import { Request, Response } from "express";

export interface ISubmissionController {
  getMySubmission(req: Request, res: Response): Promise<Response>;
  create(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  uploadAbstract(req: Request, res: Response): Promise<Response>;
  uploadSupplementary(req: Request, res: Response): Promise<Response>;
  getAbstractUrl(req: Request, res: Response): Promise<Response>;
  getSupplementaryUrl(req: Request, res: Response): Promise<Response>;
  submit(req: Request, res: Response): Promise<Response>;
  withdraw(req: Request, res: Response): Promise<Response>;
}
