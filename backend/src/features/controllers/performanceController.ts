import { Request, Response } from "express";
import { performanceSchema } from "../../schemas/performanceSchema.js";
import { ComputePerformance } from "../services/computePerformance.js";

export function performanceController(req: Request, res: Response) {
  const body = performanceSchema.parse(req.body);
  const computer = new ComputePerformance(body);
  computer.compute();
  res.status(200).json(computer.getResult());
}
