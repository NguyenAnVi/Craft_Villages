import express from "express";
import passport from "@config/passport";
import { signIn, signUp, requestRefreshTokens, logout } from "@controller/authentication.controller";

export default (router: express.Router) => {
  router.post("/auth/signIn", signIn);
  router.post("/auth/signUp", signUp);
  router.post("/auth/refreshtoken", requestRefreshTokens);
  router.post(
    "/auth/logout",
    passport.authenticate("jwt", { session: false }),
    logout
  );
};
