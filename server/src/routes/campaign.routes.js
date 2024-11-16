import express from "express";
import { check } from "express-validator";
import { createAudience, getCampaigns, checkAudienceSize } from "../controllers/campaign.controller.js";

const router = express.Router();

router.post(
  "/create-audience",
  [
    check("rules").isArray().withMessage("Rules must be an array"),
    check("rules.*.field").isString().withMessage("Field must be a string"),
    check("rules.*.operator").isString().withMessage("Operator must be a string"),
    check("rules.*.value").notEmpty().withMessage("Value must be provided"),
    check("message").isString().withMessage("Message must be a string"),
  ],
  createAudience
);

router.post(
  "/check-audience-size",
  [
    check("rules").isArray().withMessage("Rules must be an array"),
    check("rules.*.field").isString().withMessage("Field must be a string"),
    check("rules.*.operator").isString().withMessage("Operator must be a string"),
    check("rules.*.value").notEmpty().withMessage("Value must be provided"),
  ],
  checkAudienceSize
);

router.get("/", getCampaigns);

export default router;
