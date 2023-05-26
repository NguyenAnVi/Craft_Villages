import jwt from 'jwt-simple'
import config from '../config/config'
import mongoose from 'mongoose'

interface UserProfile {
    _id?: mongoose.Types.ObjectId
}
interface TokenPayload{
    sub: mongoose.Schema.Types.ObjectId
  }
type CallBackFunction = (param1: string, param2?: TokenPayload)=>{};

const token = {
    generateToken (user: UserProfile) {
        const timeStamp = new Date().getTime();
        const payload = {
            sub: user._id
        }
        return jwt.encode(payload, config.jwt_secret);
    },
    verifyToken (inputToken: string, cb:CallBackFunction) {
        const decode = jwt.decode(inputToken, config.jwt_secret)
        if (!decode) return cb('Token is not verified.');
        cb(null, decode);
    }
}

export {token}