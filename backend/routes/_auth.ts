import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db"; // Adjust path to your DB config

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user || user.password !== password) { // Replace with proper password hashing in production
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/verify-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
    // Optionally verify user still exists in DB
    pool.query("SELECT email FROM users WHERE id = $1", [decoded.id])
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(401).json({ error: "User not found" });
        }
        res.json({ email: decoded.email });
      })
      .catch(() => res.status(500).json({ error: "Database error" }));
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
