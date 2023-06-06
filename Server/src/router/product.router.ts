import express from "express";

import {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
} from "@controller/product.controller";

export default (router: express.Router) => {
  router.post("/Product/createProduct", createProduct);
  router.get("/Product/getProduct/:id", getProduct);
  router.get("/Product/getAllProduct", getAllProduct);
  router.post("/Product/updateProduct/:id", updateProduct);
  router.delete("/Product/deleteProduct/:id", deleteProduct);
};
