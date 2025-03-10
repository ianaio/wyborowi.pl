// src/pages/ProductPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Course Details</h1>
      <p>Showing details for course ID: {id}</p>
    </div>
  );
};

export default ProductPage;
