import mongoose from "mongoose";

const { Schema } = mongoose;

const communicationLogSchema = new Schema({
  audience: { type: Schema.Types.Mixed },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
});

const CommunicationLog = mongoose.model("CommunicationLog", communicationLogSchema);

export default CommunicationLog;
