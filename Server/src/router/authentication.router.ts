import express from "express";
import passport from "@config/passport";
import { signIn, signUp, logout } from "@controller/authentication.controller";

export default (router: express.Router) => {
  router.post("/auth/signIn", signIn);
  router.post("/auth/signUp", signUp);
  router.post(
    "/auth/logout",
    (req, res, next) => {
      console.log(req.headers.Authorization);
      console.log(req.headers.authorization);
      next();
    },
    passport.authenticate("jwt", { session: false }),
    logout
  );
};
