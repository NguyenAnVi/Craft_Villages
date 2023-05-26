import mongoose, {Schema, Document} from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

type comparedCallBackFunction = (param1: Error, param2?: boolean) => void;
type ComparedPasswordFunction = (candidatePassword: string, expectedPassword: string, comparedCallBack: comparedCallBackFunction) => void;
export type VillageDocument = Document & {
  villageId: string,
  villageName: string,
  villagePhone: string,
  villageEmail: string,
  adminId: mongoose.Schema.Types.ObjectId,
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
  password: string,
  comparedPassword: ComparedPasswordFunction
}

// Define the model
const schema = new Schema<VillageDocument>({
  // villageId: {
  //   type: String,
  //   unique: true,
  //   lowercase: true,
  // },
  villageName: String,
  villagePhone: {
    type: String,
    unique: true,
    validate: {
      validator(v:string) {
        return /^[0-9]{10}$/.test(v);
      },
      message: `{VALUE} is not a valid phone number!`
    }
  },
  villageEmail: {
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
  qrCode : String,
  password: String,

})

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // get access to village model, then we can use user.email, user.password
    const user: VillageDocument = this;
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

const Village = mongoose.model<VillageDocument>('Village', schema);
// Export the model
export default Village;