import mongoose from "mongoose";

export type ProductDocument = mongoose.Document & {
  village_id: mongoose.Schema.Types.ObjectId;
  productName: string;
  materials: string;
  sellingPrice: string;
  buyingPrice: string;
  productType: string;
  description: string;
  productImage: string[];
};
export default ProductDocument;
