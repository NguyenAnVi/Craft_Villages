import express from "express";
import authenticationRoute from "./authentication.router";
// import usersRoute from "././users.router";
const router = express.Router();

export default (): express.Router => {
  authenticationRoute(router);
  // usersRoute(router);
  return router;
};
