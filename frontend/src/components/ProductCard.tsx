// src/components/ProductCard.tsx
import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  sale_price?: number;
  type: string;
  video_url?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center text-white">
      {product.video_url ? (
        <video
          src={product.video_url}
          className="w-full h-48 object-cover rounded-md mb-4"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="text-lg font-semibold text-center">{product.title}</h3>
      <p className="text-gray-300 text-sm capitalize">Type: {product.type}</p>
      <p className="text-white mt-2">
        {(product.sale_price || product.price).toFixed(2)} PLN
        {product.sale_price && (
          <span className="text-gray-400 line-through ml-2">
            {product.price.toFixed(2)} PLN
          </span>
        )}
      </p>
      {product.video_url && (
        <a
          href={product.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-sm mt-2"
        >
          Full Preview
        </a>
      )}
    </div>
  );
};

export default ProductCard;
