import express from "express";
import * as passportConfig from "../config/passport";

import {
  getAllUser,
  updateProfile,
  updatePassword,
  deleteAccount,
} from "@controller/user.controller";

export default (router: express.Router) => {
  router.get("/user/getAllUser", passportConfig.isAuthenticated, getAllUser);
  router.post(
    "/user/updateProfile",
    passportConfig.isAuthenticated,
    updateProfile
  );
  router.post(
    "/user/updatePassword",
    passportConfig.isAuthenticated,
    updatePassword
  );
  router.delete(
    "/user/deleteAccount",
    passportConfig.isAuthenticated,
    deleteAccount
  );
};
