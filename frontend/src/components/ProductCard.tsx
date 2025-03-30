import { Product } from "../App";

const ProductCard = ({ product }: { product: Product }) => {
  const rifleSvg = "/assets/rifle.svg";
  const watchSvg = "/assets/watch.svg";
  const glovesSvg = "/assets/gloves.svg";
  const gogglesSvg = "/assets/goggles.svg";

  const getProductSvg = (title: string) => {
    const lowerTitle = title.toLowerCase();
    console.log(`Mapping title in ProductCard: ${title}`);
    if (lowerTitle.includes("rifle") || lowerTitle.includes("karabin")) {
      console.log(`Matched "rifle" or "karabin" for ${title}, using rifleSvg`);
      return rifleSvg;
    }
    if (lowerTitle.includes("goggles") || lowerTitle.includes("night vision")) {
      console.log(`Matched "goggles" or "night vision" for ${title}, using gogglesSvg`);
      return gogglesSvg;
    }
    if (lowerTitle.includes("watch") || lowerTitle.includes("timepiece")) {
      console.log(`Matched "watch" or "timepiece" for ${title}, using watchSvg`);
      return watchSvg;
    }
    if (
      lowerTitle.includes("gloves") ||
      lowerTitle.includes("combat gloves") ||
      lowerTitle.includes("czapka") || // Cap
      lowerTitle.includes("bluza") ||  // Hoodie
      lowerTitle.includes("koszulka")  // T-Shirt
    ) {
      console.log(`Matched "gloves", "czapka", "bluza", or "koszulka" for ${title}, using glovesSvg`);
      return glovesSvg;
    }
    if (lowerTitle.includes("pakiet") || lowerTitle.includes("wirtualny")) {
      console.log(`Matched "pakiet" or "wirtualny" for ${title}, using rifleSvg`);
      return rifleSvg; // Use rifleSvg for virtual training packages
    }
    console.log(`No match for ${title}, defaulting to rifleSvg`);
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
      <p className="text-gray-400">
        {(product.sale_price || product.price).toFixed(2)} PLN
        {product.sale_price && (
          <span className="text-gray-600 line-through ml-2">
            {product.price.toFixed(2)} PLN
          </span>
        )}
      </p>
    </div>
  );
};

export default ProductCard;
