import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalSpend: { type: Number, default: 0 },
  numVisits: { type: Number, default: 0 },
  lastVisitDate: { type: Date },
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
