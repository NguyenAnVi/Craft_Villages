import { Request, Response, NextFunction } from 'express';
import AdminModel, { AdminDocument } from '../models/Admin'
import VillageModel, { VillageDocument } from '../models/Village'
import {token} from '../util/token'

const signin = (req: Request, res:Response) => {
  const phone = req.body.phone;
  const password = req.body.password;
  if (!phone || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password.' });
  }
  AdminModel
    .findOne({
      adminPhone: phone
    })
    .then(
      (result: AdminDocument) => {
        if (result) {
          result.comparedPassword(password, result.password, (err:Error, good: boolean) => {
            if (err || !good) {
              return res.status(401).send(err?.message || { error: "Wrong password or phone number" })
            }
            res.send({
              // user: result,
              token: token.generateToken(result)
            })
          })
        } else {
          VillageModel
            .findOne({
              villagePhone : phone
            })
            .then(
              (vresult: VillageDocument) => {
                if (vresult == null) {
                  return res.status(401).send(vresult || { error: "Wrong phone number or password" })
                } else {
                  vresult.comparedPassword(password, vresult.password, (err:Error, good: boolean) => {
                    if (err || !good) {
                      return res.status(401).send(err?.message || { error: "Wrong password or phone number" })
                    }
                    res.send({
                      // user: vresult,
                      token: token.generateToken(vresult)
                    })
                  })
                }
              }
            )
        }
      }
    )
}


const signup = (req: Request, res:Response, next:NextFunction) => {
  const { phone, password, name, email, address, group, ward, district, city, workers } = req.body;

  if (!phone || !password || !name) {
    return res
      .status(422)
      .send({ error: 'You must provide name, phone and password.' });
  }
  VillageModel
    .findOne({
      $or : [
        { villagePhone: phone },
        { villageEmail: email }
      ]
    })
    .then(
      (result: VillageDocument) => {
        console.log(result);
        if (result) {
          return res
            .status(422)
            .send({ error: 'Phone or email is in use' });
        } else {

          const user = new VillageModel({
            villageName: name ,
            villagePhone: phone,
            password,
            villageEmail: (email)?(email):(""),
            address,
            group,
            ward,
            district,
            city,
            workers
          });

          user
            .save()
            .then((savedResult:VillageDocument) => {
              console.log(savedResult);
              if (!savedResult) {
                return next(savedResult)
              }
              res.json({
                success: true,
                // user: {
                //   name: savedResult.villageName || "",
                //   email: savedResult.villageEmail || "",
                // },
                token: token.generateToken(savedResult)
              })
            })
            .catch((err:Error) => {
              console.log(err);
              res.status(500).send({message:"Error saving :"+err.message})
            })
        } // if (result) else
      } // function (result)
    ) // then
}

export {
  signup,
  signin
}



