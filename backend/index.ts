import express from "express";
import "dotenv/config";
import cors from "cors";
import stripeRoutes from "./routes/stripe";
import authRoutes from "./routes/auth";

const app = express();

// CORS setup
const allowedOrigins = ["https://www.wyborowi.pl"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

// Mount routes
app.use("/api", stripeRoutes);
app.use("/api", authRoutes);

const port = process.env.NODE_PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
