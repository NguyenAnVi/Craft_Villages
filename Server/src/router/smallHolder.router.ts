import express from "express";

import {
  createSmallHolder,
  getSmallHolder,
  getAllSmallHolder,
  updateSmallHolder,
  deleteSmallHolder,
} from "@controller/smallHolder.controller";

export default (router: express.Router) => {
  router.post("/SmallHolder/createSmallHolder", createSmallHolder);
  router.get("/SmallHolder/getSmallHolder/:id", getSmallHolder);
  router.get("/SmallHolder/getAllSmallHolder", getAllSmallHolder);
  router.post("/SmallHolder/updateSmallHolder/:id", updateSmallHolder);
  router.delete("/SmallHolder/deleteSmallHolder/:id", deleteSmallHolder);
};
