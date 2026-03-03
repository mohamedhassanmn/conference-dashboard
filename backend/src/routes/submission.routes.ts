import { Router, Request, Response, NextFunction } from "express";
import multer from "multer";
import { container } from "tsyringe";
import { Tokens } from "../container/tokens";
import SubmissionController from "../controllers/submission.controller";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are accepted"));
    }
  },
});

const uploadSingle =
  (fieldName: string) => (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      next();
    });
  };

const submissionRouter = (): Router => {
  const router = Router();
  const submissionController = container.resolve<SubmissionController>(
    Tokens.SubmissionController,
  );

  router.get("/me", submissionController.getMySubmission);
  router.post("/", submissionController.create);
  router.patch("/me", submissionController.update);
  router.post(
    "/me/abstract",
    uploadSingle("file"),
    submissionController.uploadAbstract,
  );
  router.post(
    "/me/supplementary",
    uploadSingle("file"),
    submissionController.uploadSupplementary,
  );
  router.get("/me/abstract/url", submissionController.getAbstractUrl);
  router.get("/me/supplementary/url", submissionController.getSupplementaryUrl);
  router.post("/me/submit", submissionController.submit);
  router.post("/me/withdraw", submissionController.withdraw);

  return router;
};

export default submissionRouter;
