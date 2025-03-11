// src/pages/CheckoutPage.tsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const response = await fetch('https://www.wyborowi.pl/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 9999 }),
    });
    const { clientSecret } = await response.json();

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });

    if (error) {
      setError(error.message || 'An error occurred');
    } else if (paymentIntent?.status === 'succeeded') {
      console.log('Payment succeeded!');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Checkout</h1>
      <CardElement />
      {error && <p>{error}</p>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckoutPage;
