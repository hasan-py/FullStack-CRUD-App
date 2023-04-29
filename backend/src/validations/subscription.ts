import { RequestHandler } from "express";
import Joi from "joi";
import { JoiMongoObjectId, Validator } from "./validator";

export const newSubscriptionValidate: RequestHandler = (req, res, next) =>
  Validator(
    Joi.object({
      userId: JoiMongoObjectId,
      date: Joi.date()
        .required()
        .greater(Date.now() - 24 * 60 * 60 * 1000), // Validate date from greaterthen qual current date
      currentPackage: Joi.number().required(),
      amount: Joi.number().required(),
      paymentMethod: Joi.string().required(),
      paymentMethodTransactionId: Joi.string().required(),
    }),
    req,
    res,
    next
  );

export const transactionHistoryValidate: RequestHandler = (req, res, next) =>
  Validator(
    Joi.object({
      params: Joi.object({
        userId: JoiMongoObjectId,
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
      }),
    }),
    req,
    res,
    next,
    true
  );
