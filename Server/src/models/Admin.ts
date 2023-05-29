import mongoose from 'mongoose'

export type AdminDocument = mongoose.Document & {
  adminId:mongoose.Types.ObjectId
}

// Define the model
const schema = new mongoose.Schema<AdminDocument>({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
  },
})

schema.post('save', function(next){
  if (!this.adminId) {
    this.adminId = this.id;
    this.save();
  }
})

const Admin = mongoose.model<AdminDocument>('Admin', schema);
// Export the model
export default Admin;