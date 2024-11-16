import { body, validationResult } from "express-validator";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";

// Validation middleware
const validateOrder = [
  body("customerId").isMongoId().withMessage("Invalid customer ID"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
];

// Create order handler
const createOrder = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { customerId, amount } = req.body;
    console.log(`[x] Creating order with payload: ${JSON.stringify(req.body)}`);

    // Ensure customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    // Update customer details
    customer.totalSpend += amount;
    customer.numVisits += 1;

    // Ensure totalSpend is not negative
    if (customer.totalSpend < 0) {
      return res.status(400).json({ error: "Total spend cannot be negative" });
    }

    await customer.save();

    // Create order object
    const order = new Order({
      customerId,
      amount,
      status: "PENDING", // Default status
    });
    await order.save(); // Save the order

    // Return order data in the response
    res.status(201).json(order);
    console.log("[x] Response sent to client with status 201:", order);
  } catch (err) {
    console.error(`[x] Error creating order: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

// Exporting the functions with export default
export default {
  validateOrder,
  createOrder
};
