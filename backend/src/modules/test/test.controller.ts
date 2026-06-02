import { Request, Response } from "express";

export const adminRoute = (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message:
      "You have permission to access this route",
  });
};