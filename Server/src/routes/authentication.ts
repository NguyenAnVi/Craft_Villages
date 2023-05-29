import { Request, Response, NextFunction } from 'express';
import UserModel, { UserDocument } from '../models/User';
import AdminModel, { AdminDocument } from '../models/Admin';
import {token} from '../util/token';



const signin = (req: Request, res:Response) => {
  const phone = req.body.phone;
  const password = req.body.password;
  if (!phone || !password) {
    return res.status(422).send({ error: 'You must provide email and password.' });
  }
  UserModel.findOne({phone}).exec()
  .then( r => {
    if (r) {
      r.comparedPassword(password, r.password, (err:Error, good: boolean) => {
        if (err || !good) {
          return res.status(401).send(err?.message || { error: "Wrong password or phone number" })
        }
        let role;
        if (r.village !== undefined){
          console.log(Date.now()+" - a village has logged in");
          role = "VILLAGE";
        }
        if (r.admin !== undefined){
          console.log(Date.now()+" - an admin has logged in");
          role = "ADMIN";
        }
        res.status(200).send({role,token: token.generateToken(r)});
      })
    } else {
      return res.status(401).send({ message: "Wrong phone number or password" })
    }
  });

}


const signup = (req: Request, res:Response, next:NextFunction) => {
  const { phone, password, name, email } = req.body;
  if (!phone || !password || !name) {
    return res
      .status(422)
      .send({ error: 'You must provide name, phone and password.' });
  }
  try {
    UserModel
    .findOne({
      $or : [
        { phone },
        { email }
      ]
    })
    .then( (r: UserDocument) => {
      if (r) {
        return res
          .status(422)
          .send({ error: 'Phone or email is in use' });
      } else {
        new AdminModel<AdminDocument>().save()
        .then( (admin) => {
          const user = new UserModel({name, phone, password, email, admin:admin.adminId });
          user.save()
            .then((savedResult) => {
              if (!savedResult) {
                return next(savedResult)
              }
              console.log("a document has been added on User:", savedResult);
              res.json({
                success: true,
                token: token.generateToken(savedResult)
              })
            })
            .catch((err:Error) => {
              res.status(500).send({message:"Error saving :"+err.message})
            })
        } )
      } // if (result) else
    }) // then
  } catch (err) {
    res.status(500).send({message:"Error saving :"+err.message})
  }
}

export {
  signup,
  signin
}



