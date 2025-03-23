import express, { Request, Response, NextFunction, Router } from "express";
import Stripe from "stripe";
import { Pool } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia" as const, // Updated to match Stripe v17.7.0
});

// PostgreSQL pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "wyborowiplvite",
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

const router = Router();

// Login endpoint
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Nieprawidłowe dane logowania" });
      return;
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: "Błąd logowania" });
  }
});

// Stripe checkout endpoint
router.post(
  "/create-checkout-session",
  authenticate,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { productId } = req.body;
      const userEmail = req.user!.email;

      const result = await pool.query("SELECT * FROM products WHERE id = $1", [productId]);
      const product = result.rows[0];
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }

      const price = product.sale_price || product.price;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "pln",
              product_data: {
                name: product.title,
              },
              unit_amount: Math.round(price * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `https://www.wyborowi.pl/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://www.wyborowi.pl/cancel`,
        customer_email: userEmail,
      });

	await pool.query(
	  "INSERT INTO payments (user_email, product_id, stripe_session_id, amount, status, currency) VALUES ($1, $2, $3, $4, $5, $6)",
  	[userEmail, productId, session.id, price, "pending", "pln"]
	);      
   
      res.json({ url: session.url });
    } catch (e) {
      console.error("Stripe error:", e);
      res.status(500).json({ error: (e as any).message });
    }
  }
);

export default router;
