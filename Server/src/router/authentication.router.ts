import express from "express";

import Authentication from "../controller/authentication.controller";

export default (router: express.Router) => {
  router.post("/auth/signIn", Authentication.SignIn);
  router.post("/auth/signUp", Authentication.SignUp);
};
