import { NextFunction } from 'express';
import mongoose, {Document} from 'mongoose'

export type VillageDocument = Document & {
  villageId: mongoose.ObjectId,
  adminId: mongoose.ObjectId,
  address: string,
  group: string,
  ward: string,
  district: string,
  city: string,
  majorWork: string,
  materials: [string],
  productId: [mongoose.Schema.Types.ObjectId],
  workers: number, // number of workers
  qrCode: string,
}

// Define the model
const schema = new mongoose.Schema<VillageDocument>({
  adminId : {
    type: mongoose.Types.ObjectId,
    ref: 'Admin'
  },
  address : String,
  group : String,
  ward : String,
  district : String,
  city : String,
  majorWork : String,
  materials : [String],
  productId : [mongoose.Types.ObjectId],
  workers : Number,
  qrCode : String
})

schema.post('save', function(next){
  if (!this.villageId) {
    this.villageId = this.id;
    this.save();
  }
})

const Village = mongoose.model<VillageDocument>('Village', schema);
// Export the model
export default Village;