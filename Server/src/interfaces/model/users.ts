import { StringExpressionOperatorReturningBoolean } from "mongoose";

export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret: string;
}
export interface IUsers {
  fullName: string;
  phone: string;
  gender: string;
  roleAdmin: string;
  isAdmin: boolean;
  picture: string;
  email: string;
  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;
  google: string;
  token: Tokens[];
}
export default IUsers;
