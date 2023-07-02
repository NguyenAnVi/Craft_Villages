import { NextFunction } from "express";
import UserModel from "@models/user.model";
import VillageModel from "@models/smallHolder.model";
import UserDocument from "@interfaces/model/user";
import VillageDocument from "@interfaces/model/smallHolder";
import { body, check, validationResult } from "express-validator";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const createVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  VillageModel.create(...req.body)
    .then((village) => {
      if (village) {
        return res.status(200).json({ message: "Create village successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export const getVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  VillageModel.find({ _id: req.param.id })
    .then((village) => {
      return res.status(200).json({ data: village });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getAllVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  VillageModel.find({})
    .then((village) => {
      return res.status(200).json({ data: village });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const updateVillage = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  VillageModel.findById(req.param.id)
    .then((village) => {
      if (village) {
        UserModel.updateOne({ _id: village._id }, req.body)
          .then(() => {
            return res.status(200).json({
              message: "Village information has been updated.",
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

export const deleteVillage = (req: any, res: any, next: NextFunction): void => {
  VillageModel.deleteOne({ _id: req.param.id })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Village has been deleted.", status: true });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
