import mongoose from "mongoose";
import bluebird from "bluebird";
import { MongoError } from "mongodb";

import config from "../config";

export class Database {
  public static init(): any {
    (mongoose as any).Promise = bluebird;
    mongoose
      .connect(config.db.MONGO_URL)
      .then(() => {
        console.log("Connected to MongoDB!");
      })
      .catch((error: MongoError) => {
        console.error("Error connecting to MongoDB: ", error);
        console.log(error);
        process.exit(1);
      });
  }
}

export default mongoose;
