import { Request, Response, NextFunction } from "express";
import { body, check, validationResult } from "express-validator";

import UserModel from "../models/user.model";
import { UserDocument, AuthToken } from "../interfaces/model/user";
import Locals from "../provider/locals";
import jwt from "jsonwebtoken";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import "../config/passport";
class Authentication {
  public static async SignIn(
    req: any,
    res: any,
    next: NextFunction
  ): Promise<void> {
    await check("email", "E-mail cannot be blank").notEmpty().run(req);
    await check("email", "E-mail is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank").notEmpty().run(req);
    await check("password", "Password length must be atleast 8 characters")
      .isLength({ min: 8 })
      .run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors,
      });
    }
    passport.authenticate(
      "local",
      (err: Error, user: UserDocument, info: IVerifyOptions) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(400).json({ message: info.message, status: false });
        }
        req.logIn(user, (errorLogin: Error) => {
          if (errorLogin) {
            return next(errorLogin);
          }
          return res
            .status(200)
            .json({ message: "Login successfully", status: true });
        });
      }
    )(req, res, next);
  }

  public static logout = (req: any, res: any, next: NextFunction) => {
    req.logout();
    res.status(200).json({ message: "Logout successfully", status: true });
  };

  public static async SignUp(
    req: any,
    res: any,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = req.body;

    await check("email", "E-mail cannot be blank").notEmpty().run(req);
    await check("email", "E-mail is not valid").isEmail().run(req);
    await check("password", "Password cannot be blank").notEmpty().run(req);
    await check("password", "Password must be at least 8 characters long")
      .isLength({ min: 8 })
      .run(req);

    // await check("confirmPassword", "Password do not match")
    //   .equals(password)
    //   .run(req);
    await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

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
            console.log(err);
            return res
              .status(500)
              .json({ message: "Error Server", status: false, err });
          });
      })
      .catch((err) => {
        return next(err);
      });
  }
}

// let role;
// if (user.village !== undefined) {
//   console.log(Date.now() + " - a village has logged in");
//   role = "VILLAGE";
// }
// if (user.admin !== undefined) {
//   console.log(Date.now() + " - an admin has logged in");
//   role = "ADMIN";
// }

export default Authentication;
