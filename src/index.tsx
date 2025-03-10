// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';

const stripePromise = loadStripe('pk_test_51H8OFzCsXjkTPYjTMXoWpG1Kh2g4IGD8e2xQsUOXzBjf5IpunApfyF0fXdHFbV4AuCYUc3tVYpt6NywVhYzKiXuA00i3r3Ai7V');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
