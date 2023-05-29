import express from "express";

import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import createError from "http-errors";

import router from "./router";
import config from "./config";
import { Database } from "./provider/database";

const PORT = config.app.PORT;

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
