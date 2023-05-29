import { IUsers } from "./../interfaces/model/users";
import bcrypt from "bcrypt";

import mongoose from "../provider/database";

type comparedCallBackFunction = (param1: Error, param2?: boolean) => void;

type ComparedPasswordFunction = (
  candidatePassword: string,
  expectedPassword: string,
  comparedCallBack: comparedCallBackFunction
) => void;

export interface IUsersModel extends IUsers, mongoose.Document {
  comparedPassword: ComparedPasswordFunction;
  village_id: mongoose.Schema.Types.ObjectId | null;
}
// Define the model
const UsersSchema = new mongoose.Schema<IUsersModel>({
  fullName: {
    type: String,
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator(v: string) {
        return /^[0-9]{10}$/.test(v);
      },
      message: `{VALUE} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
      validator(v: string) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: `{VALUE} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
  roleAdmin: {
    type: String,
  },
  village_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "village",
  },
  gender: { type: String },
  picture: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  google: { type: String },
  token: Array,
});

UsersSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const user: IUsersModel = this;
  bcrypt.genSalt(10, (err: Error, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) {
        return next(hashErr);
      }
      user.password = hash;
      next();
    });
  });
});

// Make use of methods for comparedPassword
UsersSchema.methods.comparedPassword = async (
  candidatePassword: string,
  expectedPassword: string,
  cb: comparedCallBackFunction
) => {
  bcrypt.compare(candidatePassword, expectedPassword, (err, good) => {
    if (err) {
      return cb(err);
    }
    cb(null, good);
  });
};

// Export the model
export default mongoose.model<IUsersModel>("user", UsersSchema);
