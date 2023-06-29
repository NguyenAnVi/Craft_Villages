import mongoose from "mongoose";
import { NextFunction } from "express";
import ReportModel from "@models/report.model";
import VillageModel from "@models/village.model";
import VillageDocument from "@interfaces/model/village";
import { INotificationFull } from "@interfaces/model/notifications";
import { createNewNotification } from "@controller/notification.controller";

const checkValidObjectId = (objectid: any): mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId.isValid(objectid) ? objectid : null;
};

export const getReport = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  return res.send("In progress");
};

export const getAllReports = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  // Hiện tại hệ thống chưa có JWT token nên dùng tạm parameter :id ở đây
  const adminId = new mongoose.Types.ObjectId(req.params.id);
  if (!checkValidObjectId(adminId)) {
    return res.status(500).json({
      status: false,
      message: "Invalid id",
    });
  }

  let reportResults: any = [];

  // find villages whom admin manages
  await VillageModel.find({ admin_id: adminId })
    .then(async (villageResults) => {
      if (villageResults) {
        await Promise.all([
          ...villageResults.map(async (villageResult: any): Promise<any> => {
            console.log(villageResult.id + ":");
            const villageId = new mongoose.Types.ObjectId(villageResult.id);
            const reportResult = await ReportModel.find(
              { village_id: villageId },
              null,
              {
                limit: -1,
              }
            );
            console.log(reportResult);
            reportResults = [...reportResults, ...reportResult];
          }),
        ]).then(() => {
          res.status(200).json({
            status: true,
            data: reportResults,
          });
        });
      } else {
        return res.status(200).json({
          status: true,
          data: reportResults,
        });
      }
    })
    .catch((err) => res.status(500).json(err.message));
};

export const createNewReport = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  if (!req.body.village_id || !req.body.product_id || !req.body.quantity)
    return res.status(422).json({
      status: false,
      message: "Missing params, required: village_id, product_id, quantity",
    });

  const { village_id, product_id, quantity, sendEmail } = req.body;

  // retrieve sender, receiver:
  const village: VillageDocument = await VillageModel.findOne({
    _id: village_id,
  }).exec();

  if (!checkValidObjectId(product_id)) {
    return res.status(500).json({
      status: false,
      message: "Invalid product_id",
    });
  } else if (!checkValidObjectId(village_id)) {
    return res.status(500).json({
      status: false,
      message: "Invalid village_id",
    });
  } else {
    const dateReport = Date.now();
    const newreport = await ReportModel.create({
      village_id,
      product_id,
      quantity,
      dateReport,
    });
    await newreport
      .save()
      .then(async (saveResult) => {
        await createNewNotification({
          sender: village_id,
          receivers: [village.admin_id.toString()],
          header: `[${dateReport}] - New report from village ${village_id}!`,
          body: `${saveResult.id} : ${saveResult.product_id} => ${saveResult.quantity}`,
          sendEmail,
        } as INotificationFull);
        return res.json({
          status: true,
          data: saveResult,
        });
      })
      .catch((err: Error) => {
        console.log(err);
        return next(err);
      });
  }
};

export const deleteReport = (req: any, res: any, next: NextFunction): void => {
  return res.json({ status: true });
};
