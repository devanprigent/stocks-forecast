import { Router } from "express";
import { performanceController } from "../controllers/performanceController.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.post("", asyncHandler(performanceController));

export const performanceRouter = router;
