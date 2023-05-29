// import express from 'express';
// import UserModel, {UserDocument} from '../models/users.model';
// import VillageModel,{ VillageDocument} from '../models/village.model';
// import AdminModel, { AdminDocument } from '../models/Admin';
// const router = express.Router();

// /* GET users listing. */
// router.post('/adduser', async (req, res) => {
//   const { phone, email, role, name } = req.body;
//   if (!phone || !role || !name) return res.status(422).send({ message: 'Bad arguments' });
//   // await VillageModel.findOne({$or: [
//   //   {villagePhone:phone},
//   //   {villageEmail:email}
//   // ]}).exec()
//   // .then(result=>{
//   //   console.log(result);
//   //   if(result) return res.status(422).send({message:"Duplicated email or phone"})
//   // });

//   // await AdminModel.findOne({$or: [
//   //   {adminPhone:phone},
//   //   {adminEmail:email}
//   // ]}).exec()
//   // .then(result=>{
//   //   console.log(result);
//   //   if(result)return res.status(422).send({message:"Duplicated email or phone"})
//   // });
//   try {
//     UserModel.findOne({
//       $or: [
//         { phone },
//         { email }
//       ]
//     }).exec().then( async r=>{
//       if(r) return res.status(422).send({message:"Phone or email is already used"})
//       else
//       switch (role) {
//         case "ADMIN":
//           new UserModel({
//             name,
//             phone,
//             password: "1",
//             email,
//             admin: (await new AdminModel().save())._id
//           }).save()
//           .then((user) => {
//             delete user.password
//             if (user) {
//               return res.send({message:"Saved, passsword :1",user})
//             }
//           })
//           .catch((err:Error) => {
//             return res.status(500).send({message:"Error saving :"+err.message})
//           })

//           break;


//         case "VILLAGE":
//           const { address, group, ward, district, city, workers } = req.body;
//           new UserModel({
//             name,
//             phone,
//             password: "1",
//             email,
//             village:(await new VillageModel({address,group,ward,district,city,workers}).save())._id
//           }).save()
//           .then((user) => {
//             delete user.password
//             if (user) {
//               return res.send({message:"Saved, passsword :1",user})
//             }
//           })
//           .catch((err:Error) => {
//             return res.status(500).send({message:"Error saving :"+err.message})
//           })

//           break;
//         default:
//           return res.send({message:"nothing to save (ROLE not found)"})
//           break;
//       }
//     })
//   } catch (err) {
//     return res.status(500).send({message: "cannot save"})
//   }
// });

// export default router;
