// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';

const stripePromise = loadStripe('your-publishable-key-here');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
