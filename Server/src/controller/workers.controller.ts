import { NextFunction } from "express";
import UserModel from "@models/user.model";
import VillageModel from "@models/smallHolder.model";
import WorkersModel from "@models/workers.model";
import UserDocument from "@interfaces/model/user";
import VillageDocument from "@interfaces/model/smallHolder";
import WorkersDocument from "@interfaces/model/workers";
import { body, check, validationResult } from "express-validator";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const createWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  WorkersModel.create(...req.body)
    .then((Workers) => {
      if (Workers) {
        return res.status(200).json({ message: "Create workers successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export const getWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  WorkersModel.find({ _id: req.param.id })
    .then((Workers) => {
      return res.status(200).json({ data: Workers });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getAllWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  WorkersModel.find({})
    .then((Workers) => {
      return res.status(200).json({ data: Workers });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const updateWorkers = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  WorkersModel.findById(req.param.id)
    .then((Workers) => {
      if (Workers) {
        WorkersModel.updateOne({ _id: Workers._id }, req.body)
          .then(() => {
            return res.status(200).json({
              message: "Workers information has been updated.",
              status: true,
            });
          })
          .catch((err: WriteError & CallbackError) => {
            console.log(err);
            return next(err);
          });
      }
    })
    .catch((err: NativeError) => {
      console.log(err);
      return next(err);
    });
};

export const deleteWorkers = (req: any, res: any, next: NextFunction): void => {
  WorkersModel.deleteOne({ _id: req.param.id })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Workers has been deleted.", status: true });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
