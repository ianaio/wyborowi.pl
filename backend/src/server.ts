import express, { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import "dotenv/config";
import { pool } from "../db"; // Import pool from db.ts
import stripeRoutes from "../routes/stripe"; // Adjust path
import authRoutes from "../routes/auth"; // Adjust path

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

// Stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia" as const, // Keep your version
});

// Authenticated request interface
interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

// Authentication middleware
const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json({ error: "Brak tokenu" });
    return;
  }
  const jwtSecret = process.env.JWT_SECRET || "5291938afacd8ceff77c6f889664353574aecff43374661641d19284c5f23a6d";
  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Nieprawidłowy token" });
      return;
    }
    req.user = user as { id: number; email: string };
    next();
  });
};

// Mount routes
app.use("/api", authRoutes); // Add auth routes
app.use("/api", stripeRoutes); // Existing stripe routes

// Start server
const port = process.env.NODE_PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

