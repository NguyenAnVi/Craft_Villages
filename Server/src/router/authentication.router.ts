import express from "express";

import {
  signIn,
  signUp,
  logout,
} from "@controller/authentication.controller";

export default (router: express.Router) => {
  router.post("/auth/signIn", signIn);
  router.post("/auth/signUp", signUp);
  router.post("/auth/logout", logout);
};
