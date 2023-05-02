import { RequestHandler } from "express";
import Joi from "joi";
import { JoiMongoObjectId, Validator } from "./validator";

export const newItemValidation: RequestHandler = (req, res, next) =>
  Validator(
    Joi.object({
      name: Joi.string().required(),
      createdBy: JoiMongoObjectId,
    }),
    req,
    res,
    next
  );

export const updateItemValidation: RequestHandler = (req, res, next) =>
  Validator(
    Joi.object({
      name: Joi.string().required(),
      params: Joi.object({
        id: JoiMongoObjectId,
      }),
    }),
    req,
    res,
    next
  );

export const idParamValidation: RequestHandler = (req, res, next) =>
  Validator(
    Joi.object({
      params: Joi.object({
        id: JoiMongoObjectId,
      }),
    }),
    req,
    res,
    next,
    true
  );
