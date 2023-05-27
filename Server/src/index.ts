import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import createError from "http-errors";

import config from "./config/config";

import {loginRequired} from './routes/middleware'
import {default as testRouter} from "./routes/users";
import {signin, signup} from './routes/authentication';
import {default as adminRouter} from './routes/admins';
import {default as villageRouter} from "./routes/villages";

const app = express();
dotenv.config();

if(!config.jwt_secret || config.jwt_secret==="unsafe_jwt_secret") {
  const err = new Error('No JWT_SECRET in env variable');
}

mongoose.connect(config.db.uri, { useNewUrlParser: false } as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB Connected \n'+config.db.uri))
  .catch(err => console.log(err))

const PORT = config.app.PORT;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", testRouter);

// authentication routes
app.post('/signup', signup)
app.post('/signin', signin)

// need login routes
app.use("/admin",loginRequired,adminRouter);
app.use("/village",loginRequired,villageRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT} http://localhost:${PORT}`);
});
