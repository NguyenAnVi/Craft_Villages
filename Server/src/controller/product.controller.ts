import { NextFunction } from "express";
import UserModel from "@models/user.model";
import VillageModel from "@models/smallHolder.model";
import ProductModel from "@models/product.model";
import UserDocument from "@interfaces/model/user";
import VillageDocument from "@interfaces/model/smallHolder";
import ProductDocument from "@interfaces/model/product";
import { body, check, validationResult } from "express-validator";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const createProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  ProductModel.create({...req.body})
    .then((product) => {
      if (product) {
        return res.status(200).json({ message: "Create product successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export const getProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  ProductModel.find({ _id: req.params.id })
    .then((product) => {
      return res.status(200).json({ data: product });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getAllProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  ProductModel.find({})
    .then((product) => {
      return res.status(200).json({ data: product });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const updateProduct = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  ProductModel.findById(req.params.id)
    .then((product) => {
      if (product) {
        ProductModel.updateOne({ _id: product._id }, req.body)
          .then(() => {
            return res.status(200).json({
              message: "Product information has been updated.",
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

export const deleteProduct = (req: any, res: any, next: NextFunction): void => {
  ProductModel.deleteOne({ _id: req.params.id })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Product has been deleted.", status: true });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
