import 'module-alias/register';

import express from "express";

import cors from "cors";
import compression from "compression";
import session from "express-session";
import passport from "passport";

import MongoStore from "connect-mongo";

import cookieParser from "cookie-parser";
import createError from "http-errors";
import moment from "moment";

import router from "@router/index";
import Locals from "./provider/locals";
import { Database } from "./provider/database";
import { mongo } from "mongoose";

const PORT = Locals.config().port;
const MONGO_URI = Locals.config().mongoUri;

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
Database.init();
const store = MongoStore.create({
  mongoUrl: MONGO_URI,
  touchAfter: 24 * 3600, // time period in seconds
  autoRemove: "interval",
  autoRemoveInterval: 60, // In minutes. Default
  ttl: 60 * 60 * 24, // Thời gian sống của session là 1 ngày
});
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // Thời gian sống của session là 1 giờ (1 tiếng)
    },
    secret: Locals.config().sessionSecret,
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use("/", router());

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} http://localhost:${PORT}`);
});
