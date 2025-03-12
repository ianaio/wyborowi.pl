// backend/src/server.ts
import express, { Request, Response, RequestHandler } from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';
import pool from './db';

// Load environment variables from .env file
dotenv.config();

const app = express();
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY as string);

app.use(express.json());

// CORS setup (to allow front-end to communicate with backend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.wyborowi.pl');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define the shape of the request body
interface PaymentRequestBody {
  amount: number;
}

// Endpoint to create a PaymentIntent
const createPaymentIntent: RequestHandler<{}, any, PaymentRequestBody> = async (req, res, next) => {
  try {
    const { amount } = req.body; // Amount in cents (e.g., 9999 for $99.99)

    // Validate input
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      res.status(400).json({ error: 'Invalid amount: must be a positive number' });
      return; // Explicit return to satisfy void
    }

    // Create the PaymentIntent with Stripe
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    // Save payment details to PostgreSQL
    const query = `
      INSERT INTO payments (amount, currency, payment_intent_id, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [amount, 'usd', paymentIntent.id, paymentIntent.status];
    const result = await pool.query(query, values);
    console.log(`Saved payment with DB ID: ${result.rows[0].id}`);

    // Send the clientSecret back to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error in /api/create-payment-intent:', error);
    res.status(500).json({ error: 'Failed to create PaymentIntent' });
  }
};

app.post('/api/create-payment-intent', createPaymentIntent);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

