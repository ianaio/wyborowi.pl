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
    return <div className="text-red-500 text-center mt-8">Error loading payments: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment History</h1>
      {payments.length === 0 ? (
        <p className="text-gray-500 text-center">No payments found.</p>
      ) : (
        <ul className="space-y-4">
          {payments.map(p => (
            <li
              key={p.id}
              className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center border-l-4 border-blue-500"
            >
              <div>
                <span className="font-semibold text-lg">
                  {(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()}
                </span>
                <span className="ml-2 text-gray-600"> - {p.status}</span>
              </div>
              <div className="text-sm text-gray-500">
                ID: {p.payment_intent_id} | {new Date(p.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentsPage;

