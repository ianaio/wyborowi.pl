// src/pages/PaymentsPage.tsx
import { useEffect, useState } from 'react';

const PaymentsPage = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://www.wyborowi.pl/api/payments')
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return <div>Error loading payments: {error}</div>;
  }

  return (
    <div>
      <h1>Payment History</h1>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <ul>
          {payments.map(p => (
            <li key={p.id}>
              {(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()} - {p.status} 
              (ID: {p.payment_intent_id}, Date: {new Date(p.created_at).toLocaleString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentsPage;

