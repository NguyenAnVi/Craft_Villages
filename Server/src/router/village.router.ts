import express from "express";

import {
  createVillage,
  getVillage,
  getAllVillage,
  updateVillage,
  deleteVillage,
} from "@controller/village.controller";

export default (router: express.Router) => {
  router.post("/village/createVillage", createVillage);
  router.get("/village/getVillage/:id", getVillage);
  router.get("/village/getAllVillage", getAllVillage);
  router.post("/village/updateVillage/:id", updateVillage);
  router.delete("/village/deleteVillage/:id", deleteVillage);
};
