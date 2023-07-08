import express from "express";
import passport from "@config/passport";
import {
  getSmallHolder,
  getAllSmallHolder,
  getAllSmallHolderV2,
  updateSmallHolder,
  deleteSmallHolder,
} from "@controller/smallHolder.controller";

export default (router: express.Router) => {
  router.get(
    "/SmallHolder/getSmallHolder/:id",
    // passport.authenticate("jwt", { session: false }),
    getSmallHolder
  );
  router.get(
    "/SmallHolder/getAllSmallHolder",
    // passport.authenticate("jwt", { session: false }),
    getAllSmallHolder
  );
  router.get(
    "/SmallHolder/getAllSmallHolderV2/",
    // passport.authenticate("jwt", { session: false }),
    getAllSmallHolderV2
  );
  router.post(
    "/SmallHolder/updateProfile/:id",
    passport.authenticate("jwt", { session: false }),
    updateSmallHolder
  );
  router.delete(
    "/SmallHolder/deleteSmallHolder/:id",
    passport.authenticate("jwt", { session: false }),
    deleteSmallHolder
  );
};
