import mongoose from "mongoose";

export interface AuthToken {
  accessToken: string;
  kind: string;
}

export type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: any) => void
) => void;

export type UserDocument = mongoose.Document & {
  email: string;
  phone: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  profile: {
    fullName: string;
    gender: string;
    picture: string;
  };
  roleAdmin: string;
  isAdmin: boolean;
  village_id: mongoose.Schema.Types.ObjectId;
  tokens: AuthToken[];
  comparePassword: comparePasswordFunction;
};
export default UserDocument;
