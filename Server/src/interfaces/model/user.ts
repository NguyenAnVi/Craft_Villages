import mongoose from "mongoose";

export type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => void
) => void;

export type UserDocument = mongoose.Document & {
  email: string;
  phone: string;
  password: string;
  profile: {
    fullName: string;
    gender: string;
    picture: string;
  };
  roleAdmin: string;
  isAdmin: boolean;
  village_id: mongoose.Schema.Types.ObjectId;
  comparePassword: comparePasswordFunction;
};
export default UserDocument;
