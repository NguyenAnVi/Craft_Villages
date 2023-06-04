import nodemailer from 'nodemailer';
import Locals from "../provider/locals";
import NotificationsModel from "../models/notifications.model";
import INotifications from '../interfaces/model/notifications';
import userModel from '../models/user.model';
import notificationMailForm from '../config/notificationMailForm';
import UserDocument from '../interfaces/model/users';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for port = 465, false for other ports
  auth: {
      user: Locals.config().mailerUsername,
      pass: Locals.config().mailerPassword
  }
});

const sendEmail = (notification:INotifications) => {
  return new Promise (async (resolve, reject) => {
    let sender = null as UserDocument;
    await userModel.findById(notification.sender)
      .then(user=>{sender = user})
      .catch((err)=>reject(Error(err.message || "Sender not found.")));
    notification.receivers.map( async receiverId => {
      const succeeded = [] as string[];
      const failed = [] as string[];
      await userModel.findById(receiverId).exec()
        .then(user=>{
          if(user){
            const receiverName = (user.profile.fullName)?(user.profile.fullName):("Unknown name");
            const mail = {
              from: '🫖VietCraft.vn👜 <nguyenanvi93@gmail.com>', // sender address
              to: user.email, // list of receivers
              subject: `Notification from VietCraft.vn`,
              html: notificationMailForm(sender.profile.fullName, receiverName, notification) // html body
            };
            transporter.sendMail(mail, (error, info) => {
              console.log((error)?(error):('Email sent: ' + info.response));
            });
            succeeded.push(receiverId);
          } else {
            failed.push(receiverId);
          }
        })
        .catch(err=>false);
      resolve(failed);
    })
  });
}
// const sendEmail = async (notification:INotifications) => {
//   const senderName = await userModel.findById(notification.sender)
//     .then((user)=>{return (user.profile.fullName)?(user.profile.fullName):("Unknown name")})

//     notification.receivers.map( item => {
//       userModel.findById(item).exec()
//         .then(user=>{
//           const receiverName = (user.profile.fullName)?(user.profile.fullName):("Unknown name");
//           const mail = {
//             from: '🫖VietCraft.vn👜 <nguyenanvi93@gmail.com>', // sender address
//             to: user.email, // list of receivers
//             subject: `Notification from VietCraft.vn`,
//             // text: "Plain text body", // plain text body
//             html: notificationMailForm(senderName, receiverName, notification) // html body
//           };
//           transporter.sendMail(mail, (error, info) => {
//             console.log((error)?(error):('Email sent: ' + info.response));
//           });
//         })
//         .catch(err=>false)
//   })





// }
export {sendEmail}