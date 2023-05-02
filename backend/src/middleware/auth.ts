import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const IsAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.token as string;
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({
      error: "Authorization permission denied",
    });
  }
};
