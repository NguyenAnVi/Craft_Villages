import mongoose from "mongoose";

export type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => void
) => void;

export type UserDocument = mongoose.Document & {
  villageId: mongoose.Schema.Types.ObjectId;
  smallHolderId: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  gender: string;
  phone: string;
  roleAdmin: string;
  isAdmin: boolean;
  comparePassword: comparePasswordFunction;
};
export default UserDocument;
