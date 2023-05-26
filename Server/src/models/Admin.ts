import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

type comparedCallBackFunction = (param1: Error, param2?: boolean) => void;
type ComparedPasswordFunction = (candidatePassword: string, expectedPassword: string, comparedCallBack: comparedCallBackFunction) => void;
export type AdminDocument = mongoose.Document & {
  adminId: string,
  adminName: string,
  adminPhone: string,
  adminEmail: string,
  password: string,
  comparedPassword: ComparedPasswordFunction
}

// Define the model
const Schema = new mongoose.Schema<AdminDocument>({
  adminId: {
    type: String,
    unique: true,
    lowercase: true,
  },
  adminName: String,
  adminPhone: {
    type: String,
    unique: true,
    validate: {
      validator(v:string) {
        return /^[0-9]{10}$/.test(v);
      },
      message: `{VALUE} is not a valid phone number!`
    }
  },
  adminEmail: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true,
    validate: {
      validator(v:string) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: `{VALUE} is not a valid email address!`
    }
  },
  password: String,

})

Schema.pre('save', (next) => {
    // get access to village model, then we can use user.email, user.password
    const user = this as AdminDocument;

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
Schema.methods.comparedPassword = async (candidatePassword:string ,expectedPassword:string, cb: comparedCallBackFunction) => {
  bcrypt.compare(candidatePassword, expectedPassword, (err, good) => {
      if (err) { return cb(err)}
      cb(null, good);
  })
}

const AdminModel = mongoose.model('Admin', Schema);
// Export the model
export default AdminModel;