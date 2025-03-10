// backend/src/server.ts
import express from 'express';
import stripe from 'stripe';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY as string);

app.use(express.json());

// CORS setup (to allow front-end to communicate with backend)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update with your front-end URL
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to create a PaymentIntent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // Amount in cents (e.g., 9999 for $99.99)

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
