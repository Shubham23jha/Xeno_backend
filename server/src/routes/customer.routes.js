import express from "express";
import customerController from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/", customerController.createCustomer);

export default router;
