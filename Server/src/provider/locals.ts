import { Application } from "express";
import * as dotenv from "dotenv";
import * as path from "path";

class Locals {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
    const port = process.env.PORT;
    const appScret = process.env.APP_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
    const mongoUri = process.env.MONGO_URI;
    const sessionSecret = process.env.SESSION_SECRET;
    const mailerUsername = process.env.MAILER_USERNAME;
    const mailerPassword = process.env.MAILER_PASSWORD;
    return { port, appScret, jwtExpiresIn, mongoUri, sessionSecret, mailerUsername, mailerPassword };
  }
}
export default Locals;
