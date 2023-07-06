import express from "express";

import {
  createVillage,
  getVillage,
  getAllVillages,
  updateVillage,
  deleteVillage,
} from "@controller/village.controller";

export default (router: express.Router) => {
  router.post("/village/createVillage", createVillage);
  router.get("/village/getVillage/:id", getVillage);
  router.get("/village/getAllVillages", getAllVillages);
  router.post("/village/updateVillage/:id", updateVillage);
  router.delete("/village/deleteVillage/:id", deleteVillage);
};
