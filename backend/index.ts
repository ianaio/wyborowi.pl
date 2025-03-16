import express, { Request, Response, NextFunction } from 'express';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// Extend Express Request type for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string };
}

// Async handler wrapper
const asyncHandler = (fn: (req: Request | AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as AuthenticatedRequest, res, next)).catch(next);
  };
};

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'wyborowiplvite',
});

const JWT_SECRET = process.env.JWT_SECRET || '5291938afacd8ceff77c6f889664353574aecff43374661641d19284c5f23a6d';

// Authentication middleware
const authenticate = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    res.status(401).json({ error: 'Brak tokenu' });
    return;
  }
  const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
  req.user = decoded;
  next();
});

// Login endpoint
app.post('/api/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
    return;
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}));

// Products endpoint
app.get('/api/products', asyncHandler(async (_req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
}));

// Payments endpoint
app.get('/api/payments', authenticate, asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.user!;
  const result = await pool.query('SELECT * FROM payments WHERE user_id = $1', [id]);
  res.json(result.rows);
}));

const port = process.env.NODE_PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

// Error handling middleware (optional, for catching async errors)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Błąd serwera' });
});

