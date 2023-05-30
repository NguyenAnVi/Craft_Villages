import { Request, Response, NextFunction } from "express";
import { body, check, validationResult } from "express-validator";

import UserModel from "../models/user.model";
import { UserDocument, AuthToken } from "../interfaces/model/users";
import Locals from "../provider/locals";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
      //   req.flash("errors", errors.array());
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
          //   req.flash("errors", { msg: info.message });
          return res.status(400).json({ info: info.message });
        }
        req.logIn(user, (errorLogin: Error) => {
          if (errorLogin) {
            return next(errorLogin);
          }
          //   req.flash("success", { msg: "Success! You are logged in." });
          return res.status(200).json({ message: "Login successfully" });
        });
      }
    )(req, res, next);
  }

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
      req.flash("errors", errors.array());
      return res.status(400).json({
        errors,
      });
    }

    UserModel.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          // req.flash("errors", {
          //   msg: "Account with that email address already exists.",
          // });
          return res.status(422).json({ message: "User existing" });
        }
        UserModel.create({ email, password })
          .then((createUser) => {
            if (createUser)
              return res
                .status(200)
                .json({ message: "Create user successfully" });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: "Error Server" }, err);
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

// const { email, password } = req.body;
//     await UserModel.findOne({ email })
//       .then((user) => {
//         if (!user) {
//           return res.status(404).json({ message: "Not found" });
//         }
//         if (!user.password) {
//           return res.status(404).json({
//             message: "Please SignIn using your social creds",
//           });
//         }
//         user.comparePassword(
//           password,
//           (errorCompare: Error, isMatch: boolean) => {
//             if (errorCompare) {
//               return res.status(500).json({
//                 error: errorCompare,
//               });
//             }

//             if (!isMatch) {
//               return res.status(401).json({
//                 error: "Password does not match!",
//               });
//             }

//             const tokenUser = jwt.sign(
//               { _id: user._id },
//               Locals.config().appSecret,
//               {
//                 expiresIn: Locals.config().expiresIn * 60,
//               }
//             );

//             UserModel.findOneAndUpdate(
//               { _id: user._id },
//               { accessToken: tokenUser },
//               (errorUpdate: Error, userUpdate: UserDocument) => {
//                 if (errorUpdate) {
//                   return res.status(400).json("Update error...");
//                 } else if (userUpdate) {
//                   res.cookie("AUTH_USER", tokenUser, {
//                     domain: "localhost",
//                     path: "/",
//                   });
//                   return res
//                     .status(200)
//                     .json({ message: "SignIn successfully", tokenUser });
//                 }
//               }
//             );
//           }
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json({ error: err });
//       });
