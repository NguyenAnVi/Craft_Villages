import { Request, Response, NextFunction } from "express";
import { default as Notification, INotificationsModel } from "../models/notifications.model";
import { sendEmail } from "./mailing.controller";
import { FilterQuery } from "mongoose";

export const createNotification = async (req: Request, res: Response) => {
  const { sender, header, body } = req.body;
  if (!sender ) return res.status(422).send({message: "missing sender"});
  if (!header || !body ) return res.status(422).send({message: "missing header or body"});

  // retrieve "receiver" field
  const receivers = req.body.receivers as string[];
  if (!receivers ) return res.status(422).send({message: "missing receivers"});

  try {
    new Notification<INotificationsModel>({
      sender,
      receivers,
      header, body,
      read: false
    }).save()
    .then( (noti)=>{
      const response = {
        message:"",
        failedEmails:[] as string[]
      }

      // created Notification document successfully
      if(noti){
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
        response.message = `Error saving notification on database`
      }
      return res.send(response);
    } )
    .catch(err=>res.status(500).send(err.message));

  } catch (err) {
    return res.status(500).send({message: "Error while creating notification: "+err.message})
  }
};

export const fetchNotifications = async (req:Request, res:Response) => {
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
    .then( result=>res.send(result))
    .catch( error=>res.status(500).send(error))
  } catch (error) {
    return res.status(500).send({message: "Error while retrieving notifications: "+error.message})
  }
};

export const readNotification = async (req:Request, res:Response) => {
  const nid = req.params.notificationid;
  try {
    await Notification.findByIdAndUpdate(nid, {read:true})
    .then( (result:INotificationsModel) =>{
      if(result){
        // this result still has read = false
        // console.log(result);
        res.send(result);
      } else {
        res.status(404).send({message:"Notification not found"})
      }
    })
    .catch( error=>res.status(500).send(error))
  } catch (error) {
    return res.status(500).send({message: "Error while retrieving notification: "+error.message})
  }
};