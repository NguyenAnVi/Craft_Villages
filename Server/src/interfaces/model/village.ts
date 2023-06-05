import { Database } from "./../../provider/database";
import mongoose from "mongoose";

export type VillageDocument = mongoose.Document & {
  villageName: string;
  villagePhone: string;
  villageEmail: string;
  admin_id: mongoose.Schema.Types.ObjectId;
  address: string;
  group: string;
  ward: string;
  district: string;
  city: string;
  majorWork: string;
  materials: string[];
  product_id: mongoose.Schema.Types.ObjectId[];
  workers: string;
  qrCode: string;
  description: string;
};

export default VillageDocument;
