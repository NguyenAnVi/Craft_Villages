import jwt from "jwt-simple";
import config from "../config";
import mongoose from "mongoose";

interface UserProfile {
  id?: mongoose.Schema.Types.ObjectId;
}
interface TokenPayload {
  sub: mongoose.Schema.Types.ObjectId;
}
type CallBackFunction = (param1: string, param2?: TokenPayload) => {};

export const token = {
  generateToken(user: UserProfile) {
    const timeStamp = new Date().getTime();
    const payload = {
      sub: user.id,
    };
    return jwt.encode(payload, config.jwt_secret);
  },
  verifyToken(inputToken: string, cb: CallBackFunction) {
    const decode = jwt.decode(inputToken, config.jwt_secret);
    if (!decode) return cb("Token is not verified.");
    cb(null, decode);
  },
};


