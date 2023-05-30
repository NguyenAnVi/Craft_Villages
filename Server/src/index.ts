import express from "express";

import cors from "cors";
import compression from "compression";
import session from "express-session";
import flash from "express-flash";
import passport from "passport";

import MongoStore from "connect-mongo";

import cookieParser from "cookie-parser";
import createError from "http-errors";

import router from "./router";
import Locals from "./provider/locals";
import { Database } from "./provider/database";

const PORT = Locals.config().port;
const MONGO_URI = Locals.config().mongoUri;

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: Locals.config().sessionSecret,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      // mongoOptions: {
      //   autoReconnect: true,
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // },
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser());

Database.init();

app.use("/", router());

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404));
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} http://localhost:${PORT}`);
});
