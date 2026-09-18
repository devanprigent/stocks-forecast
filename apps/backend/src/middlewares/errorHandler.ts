import { NextFunction, Request, Response } from "express";

type HttpErrorLike = {
  status?: number;
  message?: string;
};

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const fallback: Required<HttpErrorLike> = {
    status: 500,
    message: "Internal Server Error",
  };

  let error = fallback;
  if (typeof err === "object") {
    const ogError = err as HttpErrorLike;
    error = {
      ...error,
      ...(ogError?.status && { status: ogError?.status }),
      ...(ogError?.message && { message: ogError?.message }),
    };
  }

  if (error.status >= 500) {
    console.trace(err);
  }

  res.status(error.status).json(error.message);
}
