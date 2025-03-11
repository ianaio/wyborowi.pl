const express = require('express');
const stripe = require('stripe')('your-secret-key-here');
const app = express();

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Amount in cents (e.g., 9999 for $99.99)
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
  res.send({ clientSecret: paymentIntent.client_secret });
});

app.listen(3001, () => console.log('Server running on port 3001'));
