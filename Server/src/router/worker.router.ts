import express from "express";

import {
  createWorkers,
  getWorkers,
  getAllWorkers,
  updateWorkers,
  deleteWorkers,
} from "@controller/workers.controller";

export default (router: express.Router) => {
  router.post("/Workers/createWorkers", createWorkers);
  router.get("/Workers/getWorkers/:id", getWorkers);
  router.get("/Workers/getAllWorkers", getAllWorkers);
  router.post("/Workers/updateWorkers/:id", updateWorkers);
  router.delete("/Workers/deleteWorkers/:id", deleteWorkers);
};
