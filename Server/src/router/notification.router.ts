import express from "express";

import {
  createNotification,
  fetchNotifications,
  readNotification
} from "../controller/notification.controller";

export default (router: express.Router) => {
  router.get("/notification/read/:notificationid", readNotification);
  router.post("/notification/fetch", fetchNotifications);
  router.post("/notification/create", createNotification);
};