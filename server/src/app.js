import express from "express";
import cors from "cors";
import connectDB from "./config/db.config.js";
import dotenv from "dotenv";
import passport from "./services/auth.service.js";
import session from "express-session";

dotenv.config({ path: "./.env" });


const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_PORT,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Define routes


import authRoutes from "./routes/auth.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/order.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/campaigns", campaignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
