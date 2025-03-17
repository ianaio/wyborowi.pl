import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://www.wyborowi.pl:3001/api/products')
      .then(response => setProducts(response.data))
      .catch(err => setError('Failed to fetch products: ' + err.message));
  }, []);

  return (
    <div>
      <h1>GROM Training</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
