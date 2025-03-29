import React from "react";
import rifleSvg from "../assets/rifle.svg";
import watchSvg from "../assets/watch.svg";
import glovesSvg from "../assets/gloves.svg";
import gogglesSvg from "../assets/goggles.svg";

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
  const getProductSvg = (title: string) => {
    if (title.toLowerCase().includes("rifle")) return rifleSvg;
    if (title.toLowerCase().includes("watch")) return watchSvg;
    if (title.toLowerCase().includes("gloves")) return glovesSvg;
    if (title.toLowerCase().includes("goggles")) return gogglesSvg;
    return rifleSvg; // Default
  };

  return (
    <div className="product-card">
      {product.video_url ? (
        <video
          src={product.video_url}
          className="w-full h-48 object-cover rounded-lg"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img
          src={getProductSvg(product.title)}
          alt={product.title}
          className="w-full h-48 object-contain rounded-lg"
        />
      )}
      <h3
        className={`text-xl military-font mt-4 ${
          product.type === "course" || product.type === "bundle"
            ? "text-blue-400"
            : "text-orange-400"
        }`}
      >
        {product.title}
      </h3>
      <p className="text-gray-400 text-sm capitalize mt-1">Type: {product.type}</p>
      <p className="text-white mt-2">
        {(product.sale_price || product.price).toFixed(2)} PLN
        {product.sale_price && (
          <span className="text-gray-600 line-through ml-2">
            {product.price.toFixed(2)} PLN
          </span>
        )}
      </p>
      {product.video_url && (
        <a
          href={product.video_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-sm mt-2 block"
        >
          Full Preview
        </a>
      )}
    </div>
  );
};

export default ProductCard;
