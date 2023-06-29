import express from "express";
import * as passportConfig from "@config/passport";
import passport from "passport";
import {
  getAllUser,
  updateProfile,
  updatePassword,
  deleteAccount,
} from "@controller/user.controller";

export default (router: express.Router) => {
  router.get(
    "/user/getAllUser",
    passport.authenticate("jwt", { session: false }),
    getAllUser
  );
  router.post(
    "/user/updateProfile",
    passport.authenticate("jwt", { session: false }),
    updateProfile
  );
  router.post(
    "/user/updatePassword",
    passport.authenticate("jwt", { session: false }),
    updatePassword
  );
  router.delete(
    "/user/deleteAccount",
    passport.authenticate("jwt", { session: false }),
    deleteAccount
  );
};
