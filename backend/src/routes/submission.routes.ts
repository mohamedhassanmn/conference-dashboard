import { Router } from "express";
import multer from "multer";
import { container } from "tsyringe";
import { Tokens } from "../container/tokens";
import SubmissionController from "../controllers/submission.controller";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
});

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
    upload.single("file"),
    submissionController.uploadAbstract,
  );
  router.post(
    "/me/supplementary",
    upload.single("file"),
    submissionController.uploadSupplementary,
  );
  router.get("/me/abstract/url", submissionController.getAbstractUrl);
  router.get("/me/supplementary/url", submissionController.getSupplementaryUrl);
  router.post("/me/submit", submissionController.submit);
  router.post("/me/withdraw", submissionController.withdraw);

  return router;
};

export default submissionRouter;
