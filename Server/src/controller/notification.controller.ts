import { Request, Response, NextFunction } from "express";
import { default as Notification, INotificationsModel } from "../models/notifications.model";
import { sendEmail } from "./mailing.controller";
import { FilterQuery } from "mongoose";
import UserModel from "@models/user.model";

export const create = async (req: Request, res: Response) => {
  if (!req.body.sender ) return res.status(422).json({status:false, message: "missing sender"});
  if (!req.body.receivers ) return res.status(422).json({status:false, message: "missing receivers"});
  if (!req.body.header || !req.body.body ) return res.status(422).json({status:false, message: "missing header or body"});

  const senderId = req.body.sender;
  const receiverIds = req.body.receivers as string[];
  const { header, body } = req.body;

  await UserModel.findById(senderId)
  .then(sender=>{
    if(!sender) return res.status(404).json({status:false, message:`Sender id not found`});
    else {
      new Notification<INotificationsModel>({
        sender : senderId,
        receivers : receiverIds,
        header, body,
        read: false
      }).save()
      .then( (noti)=>{
        const response = {
          status:undefined as boolean,
          message:"",
          failedEmails:[] as string[]
        }

        // created Notification document successfully
        if(noti){
          response.status = true;
          response.message = `Created notification`;
          // if Send mails is included
          if(req.body.sendemail){
            sendEmail(noti)
            .then((failedEmails:string[])=>{
              response.failedEmails = failedEmails; // receiverId[] which is not in Users collection
            })
            .catch(error=>{
              response.message += ` but send emails failed: ${error.message}`;
            });
          }
        } else {
          response.status = false;
          response.message = `Error saving notification.`
        }
        return res.send(response);
      } )
      .catch(err=>res.status(500).send(err.message));
    }
  })
  .catch(err=>res.status(500).json({status:false, message:err.message}));
};

export const fetch = async (req:Request, res:Response) => {
  const uid = req.body.id;
  const filter:INotificationsModel = req.body.filter;

  const filters: FilterQuery<INotificationsModel> = filter;
  const options = { projection: { _id: 0 }, limit: 10 };
  try {
    await Notification.find({
      receivers: {
        $in: [uid]
      },
      ...filters
    }, {}, options).exec()
    .then( result=>res.json({status:true,result}))
    .catch( error=>res.status(500).send(error))
  } catch (error) {
    return res.status(500).send({message: "Error while retrieving notifications: "+error.message})
  }
};

export const read = async (req:Request, res:Response) => {
  const nid = req.params.notificationid;
  try {
    await Notification.findByIdAndUpdate(nid, {read:true})
    .then( (result:INotificationsModel) =>{
      if(result){
        // this result still has read = false
        result.read = true;
        res.json({status:true,result});
      } else {
        res.status(404).send({message:"Notification not found"})
      }
    })
    .catch( error=>res.status(500).send(error))
  } catch (error) {
    return res.status(500).send({message: "Error while retrieving notification: "+error.message})
  }
};
export const markUnread = async (req:Request, res:Response) => {
  const nid = req.params.notificationid;
  try {
    await Notification.findByIdAndUpdate(nid, {read:false})
    .then( (result:INotificationsModel) =>{
      if(result){
        // this result still has read = false
        result.read = false;
        res.json({status:true,result});
      } else {
        res.status(404).json({status:false, message:"Notification not found"})
      }
    })
    .catch( error=>res.status(500).send(error))
  } catch (error) {
    return res.status(500).send({status: false, message: "Error while retrieving notification: "+error.message})
  }
}