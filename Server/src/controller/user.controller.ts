import { NextFunction } from "express";
import UserModel from "@models/user.model";
import VillageModel from "@models/smallHolder.model";
import UserDocument from "@interfaces/model/user";
import VillageDocument from "@interfaces/model/smallHolder";
import { body, check, validationResult } from "express-validator";
import { WriteError } from "mongodb";
import { CallbackError } from "mongoose";

export const getAllUser = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  UserModel.find({})
    .then((user) => {
      return res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

export const getUser = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  UserModel.find({ _id: req.params.id })
    .then((user) => {
      return res.status(200).json({ data: user });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
export const updateProfile = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  const user = req.user as UserDocument;
  console.log(user);

  UserModel.findById(user._id)
    .then((userResult: UserDocument) => {
      if (userResult) {
        UserModel.updateOne({ _id: userResult._id }, req.body)
          .then((userResultUpdate: any) => {
            UserModel.findOne({ _id: user._id })
              .then((userAfter) => {
                const {
                  _id,
                  villageId,
                  smallHolderId,
                  email,
                  phone,
                  fullName,
                  isAdmin,
                  isAdminWebsite,
                  isAdminSmallHolder,
                } = userAfter;
                return res.status(200).json({
                  message: "Profile information has been updated.",
                  data: {
                    _id,
                    villageId,
                    smallHolderId,
                    email,
                    phone,
                    fullName,
                    isAdmin,
                    isAdminWebsite,
                    isAdminSmallHolder,
                    accessToken: req.headers.Authoraization,
                  },
                  status: true,
                });
              })
              .catch((err) => next(err));
          })
          .catch((err: WriteError & CallbackError) => {
            console.log(err);
            if (err.code === 11000)
              return res.status(400).json({
                message:
                  "The email address you have entered is already associated with an account.",
                status: false,
              });
            return next(err);
          });
      }
    })
    .catch((err: NativeError) => {
      console.log(err);
      return next(err);
    });
};

export const updatePassword = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  await check("password", "Password must be at least 8 characters long")
    .isLength({ min: 8 })
    .run(req);
  await check("confirmPassword", "Passwords do not match")
    .equals(req.body.password)
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), status: false });
  }

  const user = req.user as UserDocument;
  UserModel.findById(user._id)
    .then((userResult: UserDocument) => {
      UserModel.updateOne(
        { _id: userResult._id },
        { password: req.body.password }
      )
        .then((userResultUpdate) => {
          return res
            .status(200)
            .json({ message: "Password has been changed.", status: true });
        })
        .catch((err: WriteError & CallbackError) => {
          console.log(err);
          return next(err);
        });
    })
    .catch((err: NativeError) => {
      console.log(err);
      return next(err);
    });
};

export const deleteAccount = (req: any, res: any, next: NextFunction): void => {
  const user = req.user as UserDocument;
  UserModel.deleteOne({ _id: user.id })
    .then(() => {
      req.logout();
      return res
        .status(200)
        .json({ message: "Your account has been deleted.", status: true });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};
