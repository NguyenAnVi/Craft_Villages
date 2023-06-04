import passport from "passport";
import passportLocal from "passport-local";
import { find } from "lodash";

import { UserDocument } from "../interfaces/model/user";
import UserModel from "../models/user.model";

import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    UserModel.findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`,
          });
        }
        user.comparePassword(
          password,
          (errorCompare: Error, isMatch: boolean) => {
            if (errorCompare) {
              return done(errorCompare);
            }
            if (isMatch) {
              return done(undefined, user);
            }
            return done(undefined, false, {
              message: "Invalid email or password.",
            });
          }
        );
      })
      .catch((err) => {
        return done(err);
      });
  })
);

/**
 * Login Required middleware.
 */
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json("You have no permission to access this page");
};

/**
 * Authorization Required middleware.
 */
// export const isAuthorized = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const provider = req.path.split("/").slice(-1)[0];
//   console.log(provider);

//   const user = req.user as UserDocument;
//   if (find(user.tokens, { kind: provider })) {
//     next();
//   } else {
//     res.status(401).json("You have no permission to access this page");
//   }
// };
