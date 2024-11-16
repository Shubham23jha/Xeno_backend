// customer.controller.js
import { body, validationResult } from "express-validator";
import Customer from "../models/Customer.js";

const createCustomer = async (req, res) => {
  try {
    console.log("[x] Received request to create customer with data:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error("[x] Validation error:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res
        .status(400)
        .json({ error: "Email must be a valid email address" });
    }

    const customer = new Customer({ name, email });
    await customer.save();

    res.status(201).json(customer);
    console.log("[x] Response sent to client with status 201:", customer);
  } catch (err) {
    console.error("[x] Error creating customer:", err);
    res.status(400).json({ error: err.message });
  }
};

const validateCreateCustomer = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
];

export default {
  createCustomer,
  validateCreateCustomer,
};
