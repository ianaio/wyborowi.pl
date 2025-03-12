// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';
import './index.css';

const stripePromise = loadStripe('pk_test_51R1O6yQ67xdNaVLCZFPKv5ANzlL5MTzqdfOvBUz7DzTTZ65i9RHEVjuZRCtaO1OkHZOmbQQUonxWvN43XBz7CSGj00i4se8PnA');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);

