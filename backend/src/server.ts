import express, { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import "dotenv/config";
import { pool } from "../db";
import stripeRoutes from "../routes/stripe";
import authRoutes from "../routes/auth";

const app = express();

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

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia", // Updated to match stripe@17.7.0
});

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

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

app.use("/api", authRoutes);
app.use("/api", stripeRoutes);

const port = process.env.NODE_PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
