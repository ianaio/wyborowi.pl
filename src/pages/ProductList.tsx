// src/pages/ProductList.tsx
import { products } from '../data/products';

const ProductList = () => {
  return (
    <div>
      <h1>Kursy</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <a href={`/kursy/${product.id}`}>Naucz się więcej</a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
