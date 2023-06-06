import express from "express";
import authenticationRoute from "./authentication.router";
import notificationRouter from "./notification.router";
import userRoute from "@router/user.router";
import villageRoute from "./village.router";
import productRoute from "./product.router";
const router = express.Router();

export default (): express.Router => {
  authenticationRoute(router);
  notificationRouter(router);
  userRoute(router);
  villageRoute(router);
  productRoute(router);
  return router;
};
