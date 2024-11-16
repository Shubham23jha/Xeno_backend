import mongoose from "mongoose";
import Customer from "./Customer.js";

const { Schema } = mongoose;

const orderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
