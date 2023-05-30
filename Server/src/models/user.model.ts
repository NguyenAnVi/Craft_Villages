import mongoose from "../provider/database";
import UserDocument, {
  comparePasswordFunction,
} from "../interfaces/model/users";
import bcrypt from "bcrypt";

// Define the model
const UserSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator (v: string) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid email address!`,
      },
    },

    phone: {
      type: String,
      unique: true,
      validate: {
        validator (v: string) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props: { value: any }) =>
          `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },

    profile: {
      fullName: {
        type: String,
      },
      gender: { type: String },

      picture: { type: String },
    },

    roleAdmin: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    village_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "village",
    },
    tokens: Array,
  },
  { timestamps: true }
);

UserSchema.pre("save", function save(next) {
  const user = this as UserDocument;

  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, (err: Error, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (
  candidatePassword,
  cb
) {
  bcrypt.compare(
    candidatePassword,
    this.password,
    (err: mongoose.Error, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

UserSchema.methods.comparePassword = comparePassword;

// Export the model
export default mongoose.model<UserDocument>("user", UserSchema);
