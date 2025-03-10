// src/pages/ProductList.tsx
import { products } from '../data/products';

const ProductList = () => {
  return (
    <div>
      <h1>Courses</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <a href={`/course/${product.id}`}>Learn More</a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
