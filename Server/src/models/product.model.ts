import mongoose from "../provider/database";
import ProductDocument from "@ỉnterfaces/model/product";

const ProductScheme = new mongoose.Schema<ProductDocument>({
  village_id: { type: mongoose.Schema.Types.ObjectId },
  productName: { type: String },
  materials: { type: String },
  sellingPrice: { type: String },
  buyingPrice: { type: String },
  productType: { type: String },
  description: { type: String },
  productImage: { type: String },
});

const ProductModel = mongoose.model("product", ProductScheme);
export default ProductModel;
