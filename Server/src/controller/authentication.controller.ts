import { Request, Response, NextFunction } from "express";
import { body, check, validationResult } from "express-validator";

import UserModel from "@models/user.model";
import { UserDocument } from "@interfaces/model/user";
import Locals from "@provider/locals";
import jwt from "jsonwebtoken";
import passport from "@config/passport";
import { IVerifyOptions } from "passport-local";

export const signIn = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  await check("email", "E-mail cannot be blank").notEmpty().run(req);
  await check("email", "E-mail is not valid").isEmail().run(req);
  await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
  await check("password", "Password cannot be blank").notEmpty().run(req);
  await check("password", "Password length must be atleast 8 characters")
    .isLength({ min: 8 })
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  passport.authenticate(
    "local",
    { session: false },
    (err: Error, user: UserDocument, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: info.message, status: false });
      }
      req.logIn(user, { session: false }, (errorLogin: Error) => {
        if (errorLogin) {
          return next(errorLogin);
        }

        const token = jwt.sign({ id: user._id }, Locals.config().jwtSecretKey, {
          expiresIn: Locals.config().jwtExpiresIn,
        });

        const {
          villageId,
          smallHolderId,
          email,
          phone,
          fullName,
          gender,
          roleAdmin,
          isAdmin,
        } = user;

        return res.status(200).json({
          message: "Login successfully",
          status: true,
          data: {
            villageId,
            smallHolderId,
            email,
            phone,
            fullName,
            gender,
            roleAdmin,
            isAdmin,
            accessToken: token,
          },
        });
      });
    }
  )(req, res, next);
};

export const logout = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  try {
    return res
      .status(200)
      .json({ message: "Logout successfully", status: true });
  } catch (err) {
    next(err);
  }
};

export const signUp = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  await check("email", "E-mail cannot be blank").notEmpty().run(req);
  await check("email", "E-mail is not valid").isEmail().run(req);
  await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);
  await check("password", "Password cannot be blank").notEmpty().run(req);
  await check("password", "Password must be at least 8 characters long")
    .isLength({ min: 8 })
    .run(req);
  await check("cPassword", "Password do not match").equals(password).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    });
  }

  UserModel.findOne({ email })
    .then((existingUser: UserDocument) => {
      if (existingUser) {
        return res
          .status(422)
          .json({ message: "User existing", status: false });
      }
      UserModel.create({ email, password })
        .then((createUser) => {
          if (createUser)
            return res
              .status(200)
              .json({ message: "Create user successfully", status: true });
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
};

// let role;
// if (user.village !== undefined) {
//   console.log(Date.now() + " - a village has logged in");
//   role = "VILLAGE";
// }
// if (user.admin !== undefined) {
//   console.log(Date.now() + " - an admin has logged in");
//   role = "ADMIN";
// }
