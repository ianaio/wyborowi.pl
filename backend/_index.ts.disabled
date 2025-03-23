import express from "express";
import "dotenv/config";
import cors from "cors";
import stripeRoutes from "./routes/stripe";

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

// Mount Stripe routes
app.use("/api", stripeRoutes);

// Start server
const port = process.env.NODE_PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
