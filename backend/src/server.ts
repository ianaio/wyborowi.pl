// backend/src/server.ts
import express, { Request, Response, RequestHandler } from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';
import pool from './db';

dotenv.config();

const app = express();
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY as string);

// Webhook endpoint (needs raw body, so place before express.json())
const webhookHandler: RequestHandler = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Missing stripe-signature or webhook secret');
    res.status(400).send('Webhook Error: Missing signature or secret');
    return;
  }

  try {
    const event = stripeInstance.webhooks.constructEvent(req.body, sig as string, webhookSecret);
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      await pool.query(
        'UPDATE payments SET status = $1 WHERE payment_intent_id = $2',
        ['succeeded', paymentIntent.id]
      );
      console.log(`Updated payment ${paymentIntent.id} to succeeded`);
    }
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send('Webhook Error');
  }
};

app.post('/api/webhook', express.raw({ type: 'application/json' }), webhookHandler);

app.use(express.json());

// CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://www.wyborowi.pl');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Define the shape of the request body for POST
interface PaymentRequestBody {
  amount: number;
}

// POST endpoint to create a PaymentIntent
const createPaymentIntent: RequestHandler<{}, any, PaymentRequestBody> = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      res.status(400).json({ error: 'Invalid amount: must be a positive number' });
      return;
    }

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    const query = `
      INSERT INTO payments (amount, currency, payment_intent_id, status)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [amount, 'usd', paymentIntent.id, paymentIntent.status];
    const result = await pool.query(query, values);
    console.log(`Saved payment with DB ID: ${result.rows[0].id}`);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error in /api/create-payment-intent:', error);
    res.status(500).json({ error: 'Failed to create PaymentIntent' });
  }
};

app.post('/api/create-payment-intent', createPaymentIntent);

// GET endpoint to fetch payment history
app.get('/api/payments', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM payments ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

