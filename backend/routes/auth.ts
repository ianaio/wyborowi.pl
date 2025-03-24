import express, { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../db";
import { QueryResult } from "pg";

const router = express.Router();

const loginHandler: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Nieprawidłowe dane logowania" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Błąd logowania" });
  }
};

const verifyTokenHandler: RequestHandler = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Brak tokenu" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
    pool.query("SELECT email FROM users WHERE id = $1", [decoded.id])
      .then((result: QueryResult) => {
        if (result.rows.length === 0) {
          return res.status(401).json({ error: "Użytkownik nie znaleziony" });
        }
        res.json({ email: decoded.email });
      })
      .catch(() => res.status(500).json({ error: "Błąd bazy danych" }));
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ error: "Nieprawidłowy lub wygasły token" });
  }
};

router.post("/login", loginHandler);
router.get("/verify-token", verifyTokenHandler);

export default router;
