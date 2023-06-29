import mongoose from "@provider/database";

import { ReportDocument } from "@interfaces/model/report";

const ReportSchema = new mongoose.Schema<ReportDocument>({
  village_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    validate: {
      validator(v: any) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: (props) => `${props.value} is not a valid ObjectId!`,
    },
  },
  product_id: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  quantity: {
    type: mongoose.Schema.Types.Number,
    required: true,
    default: 0,
  },
  dateReport: {
    type: Date,
    default: Date.now(),
  },
});

const ReportModel = mongoose.model<ReportDocument>("report", ReportSchema);
export default ReportModel;
