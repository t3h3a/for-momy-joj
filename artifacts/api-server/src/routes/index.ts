import { Router, type IRouter } from "express";
import healthRouter from "./health";
import questionAnswersRouter from "./questionAnswers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(questionAnswersRouter);

export default router;
