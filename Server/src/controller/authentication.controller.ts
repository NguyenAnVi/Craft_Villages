import { Request, Response, NextFunction } from "express";
import UsersModel, { IUsersModel } from "../models/users.model";
import { token } from "../util/token";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password." });
  }

  try {
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }
    user.comparedPassword(
      password,
      user.password,
      (err: Error, good: boolean) => {
        if (err || !good) {
          return res
            .status(401)
            .send(err?.message || { error: "Wrong password or phone number" });
        }
        // let role;
        // if (user.village !== undefined) {
        //   console.log(Date.now() + " - a village has logged in");
        //   role = "VILLAGE";
        // }
        // if (user.admin !== undefined) {
        //   console.log(Date.now() + " - an admin has logged in");
        //   role = "ADMIN";
        // }
        const initToken = token.generateToken(user);
        res.cookie("AUTH_USER", initToken, {
          domain: "localhost",
          path: "/",
        });
        return res
          .status(200)
          .json({ message: "Login successfully", token: initToken });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error server" });
  }
};

// export const register = (req: Request, res: Response, next: NextFunction) => {
//   const { phone, password, name, email } = req.body;
//   if (!phone || !password || !name) {
//     return res
//       .status(422)
//       .send({ error: "You must provide name, phone and password." });
//   }
//   try {
//     UsersModel.findOne({
//       $or: [{ phone }, { email }],
//     }).then((r: IUsersModel) => {
//       if (r) {
//         return res.status(422).send({ error: "Phone or email is in use" });
//       } else {
//         new AdminModel<AdminDocument>().save().then((admin) => {
//           const user = new UsersModel({
//             name,
//             phone,
//             password,
//             email,
//             admin: admin.adminId,
//           });
//           user
//             .save()
//             .then((savedResult) => {
//               if (!savedResult) {
//                 return next(savedResult);
//               }
//               console.log("a document has been added on User:", savedResult);
//               res.json({
//                 success: true,
//                 token: token.generateToken(savedResult),
//               });
//             })
//             .catch((err: Error) => {
//               res.status(500).send({ message: "Error saving :" + err.message });
//             });
//         });
//       } // if (result) else
//     }); // then
//   } catch (err) {
//     res.status(500).send({ message: "Error saving :" + err.message });
//   }
// };
