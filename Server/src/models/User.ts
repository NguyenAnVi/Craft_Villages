import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

type comparedCallBackFunction = (param1: Error, param2?: boolean) => void;
type ComparedPasswordFunction = (candidatePassword: string, expectedPassword: string, comparedCallBack: comparedCallBackFunction) => void;
export type UserDocument = mongoose.Document & {
  name: string,
  phone: string,
  email: string,
  password: string,
  admin: mongoose.Schema.Types.ObjectId | null,
  village: mongoose.Types.ObjectId | null,
  comparedPassword: ComparedPasswordFunction
}

// Define the model
const schema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v:string) {
        return /^[0-9]{10}$/.test(v);
      },
      message: `{VALUE} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    validate: {
      validator(v:string) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: `{VALUE} is not a valid email address!`
    }
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: mongoose.Types.ObjectId,
    ref: 'Admin'
  },
  village: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Village'
  }
})

schema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  // get access to village model, then we can use user.email, user.password
  const user:UserDocument = this;
  bcrypt.genSalt(10, (err: Error, salt) => {
    if (err) { return next(err) }

    bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) { return next(hashErr); }

      user.password = hash;
      next()
    })
  })
})

// Make use of methods for comparedPassword
schema.methods.comparedPassword = async (candidatePassword:string ,expectedPassword:string, cb: comparedCallBackFunction) => {
  bcrypt.compare(candidatePassword, expectedPassword, (err, good) => {
      if (err) { return cb(err)}
      cb(null, good);
  })
}

// Export the model
export default mongoose.model<UserDocument>('User', schema);