import mongoose from "@provider/database";

import { ReportDocument } from "@ỉnterfaces/model/report";

const ReportSchema = new mongoose.Schema<ReportDocument>({
  village_id: { type: mongoose.Schema.Types.ObjectId },
  product_id: { type: [mongoose.Schema.Types.ObjectId] },
  code: { type: String },
  dateReport: { type: Date },
});

const ReportModel = mongoose.model<ReportDocument>("report", ReportSchema);
export default ReportModel;
