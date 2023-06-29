import mongoose from "@provider/database";
import VillageDocument from "@interfaces/model/village";

// Define the model
const VillageSchema = new mongoose.Schema<VillageDocument>({
  villageName: { type: String },
  villagePhone: { type: String },
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  villageEmail: { type: String },
  address: { type: String },
  group: { type: String },
  ward: { type: String },
  district: { type: String },
  city: { type: String },
  majorWork: { type: String },
  materials: [{ type: String }],
  product_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  workers: { type: String },
  qrCode: { type: String },
  description: { type: String },
});

// Export the model
const VillageModel = mongoose.model<VillageDocument>("Village", VillageSchema);
export default VillageModel;
