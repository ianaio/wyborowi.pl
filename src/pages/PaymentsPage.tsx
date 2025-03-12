// src/pages/PaymentsPage.tsx
import { useEffect, useState } from 'react';

const PaymentsPage = () => {
  const [payments, setPayments] = useState<any[]>([]);
  useEffect(() => {
    fetch('https://www.wyborowi.pl/api/payments')
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h1>Payments</h1>
      <ul>
        {payments.map(p => (
          <li key={p.id}>{p.amount / 100} {p.currency} - {p.status}</li>
        ))}
      </ul>
    </div>
  );
};
export default PaymentsPage;
