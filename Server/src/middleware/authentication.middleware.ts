import {token} from '../util/token'
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'mongoose';
import UsersModel, { IUsersModel } from '../models/users.model';

interface TokenPayload{
  sub: Schema.Types.ObjectId
}

interface ModRequest extends Request{
  user: IUsersModel
}

const loginRequired = (req:ModRequest, res:Response, next:NextFunction) => {
  if (!req.header('Authorization')) return res.status(401).send({message: 'Please make sure your request has an Authorization header.'});
  // Validate jwt
  const tryToken = req.header('Authorization').split(' ')[0];
  token.verifyToken(tryToken, (err:string, payload:TokenPayload) => {
    if (err) return res.status(401).send(err);
    UsersModel.findById(payload.sub)
      .then((result) => {
        if (!result) {
          return res.status(404).send({
              error: 'Middleware error: User not found!!!'
          });
        }
        req.user = result;
        next();
      })
  })
}

export {loginRequired}