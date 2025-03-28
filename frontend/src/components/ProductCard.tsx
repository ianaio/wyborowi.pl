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
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,153,255,0.8)] flex flex-col items-center text-white">
      {product.video_url ? (
        <video
          src={product.video_url}
          className="w-full h-32 object-cover rounded-lg mt-2"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <div
          className="w-full h-32 bg-cover bg-center rounded-lg mt-2"
          style={{ backgroundImage: `url('https://via.placeholder.com/300x150?text=${product.title}')` }}
        ></div>
      )}
      <h3 className={`text-xl font-bold mt-2 ${product.type === "course" || product.type === "bundle" ? "text-blue-400" : "text-orange-400"}`}>
        {product.title}
      </h3>
      <p className="text-gray-300 text-sm capitalize mt-1">Type: {product.type}</p>
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
