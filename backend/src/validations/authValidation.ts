import { RequestHandler } from "express";
import Joi from "joi";
import { Validator } from "./validator";

export const newUserValidation: RequestHandler = (req, res, next) =>
  Validator(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    req,
    res,
    next
  );

export const loginValidation: RequestHandler = (req, res, next) =>
  Validator(
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    req,
    res,
    next
  );
