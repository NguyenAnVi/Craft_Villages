import express from "express";

import {  login } from "../controller/authentication.controller";

export default (router: express.Router) => {
  // router.post("/auth/register", register);
  router.post("/auth/login", login);
};
