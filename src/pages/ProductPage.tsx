// src/pages/ProductPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Szczegóły Kursu</h1>
      <p>Pokazuje szczegóły kursów ID: {id}</p>
    </div>
  );
};

export default ProductPage;
