import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ISubmissionController } from "./submission-controller.interface";
import { Tokens } from "../container/tokens";
import { ISubmissionService } from "../services/submission-service.interface";

@injectable()
export default class SubmissionController implements ISubmissionController {
  constructor(
    @inject(Tokens.SubmissionService)
    private readonly service: ISubmissionService,
  ) {}

  // GET /submissions/me
  getMySubmission = async (req: Request, res: Response) => {
    try {
      const user_id = req.user!.user_id;
      const submission = await this.service.getMySubmission(user_id);
      if (!submission)
        return res.status(404).json({ message: "No submission found" });
      return res.json(submission);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  // POST /submissions
  create = async (req: Request, res: Response) => {
    try {
      const user_id = req.user!.user_id;
      const submission = await this.service.createSubmission(user_id, req.body);
      return res.status(201).json(submission);
    } catch (err: any) {
      const status = err.message.includes("already has") ? 409 : 400;
      return res.status(status).json({ message: err.message });
    }
  };

  // PATCH /submissions/me
  update = async (req: Request, res: Response) => {
    try {
      const user_id = req.user!.user_id;
      const submission = await this.service.updateSubmission(user_id, req.body);
      return res.json(submission);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  // POST /submissions/me/abstract
  uploadAbstract = async (req: Request, res: Response) => {
    try {
      const user_id = req.user!.user_id;
      if (!req.file)
        return res.status(400).json({ message: "No file provided" });
      const submission = await this.service.uploadAbstract(
        user_id,
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname,
      );
      return res.json(submission);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  // POST /submissions/me/supplementary
  uploadSupplementary = async (req: Request, res: Response) => {
    try {
      const user_id = req.user!.user_id;
      if (!req.file)
        return res.status(400).json({ message: "No file provided" });
      const submission = await this.service.uploadSupplementary(
        user_id,
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname,
      );
      return res.json(submission);
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };

  // GET /submissions/me/abstract/url
  getAbstractUrl = async (req: Request, res: Response) => {
    try {
      const url = await this.service.getAbstractUrl(req.user!.user_id);
      return res.json({ url });
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  };

  // GET /submissions/me/supplementary/url
  getSupplementaryUrl = async (req: Request, res: Response) => {
    try {
      const url = await this.service.getSupplementaryUrl(req.user!.user_id);
      return res.json({ url });
    } catch (err: any) {
      return res.status(404).json({ message: err.message });
    }
  };

  // POST /submissions/me/submit
  submit = async (req: Request, res: Response) => {
    try {
      const submission = await this.service.submitSubmission(req.user!.user_id);
      return res.json(submission);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };

  // POST /submissions/me/withdraw
  withdraw = async (req: Request, res: Response) => {
    try {
      const submission = await this.service.withdrawSubmission(
        req.user!.user_id,
      );
      return res.json(submission);
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  };
}
