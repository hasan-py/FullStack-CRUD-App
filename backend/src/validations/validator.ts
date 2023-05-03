import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const Validator = async (
  schemaName: Joi.ObjectSchema,
  req: Request,
  res: Response,
  next: NextFunction,
  params?: Boolean
) => {
  let value;
  if (params) {
    value = await schemaName.validate({ params: req.params, ...req.body });
  } else {
    value = await schemaName.validate(req.body);
  }

  try {
    if (value.error) {
      const message = value.error.details[0].message;
      return res.status(500).json({ message });
    } else {
      next();
    }
  } catch (error) {
    console.log("Validator Error ", error);
  }
};

export const JoiMongoObjectId = Joi.string().hex().length(24).required();
