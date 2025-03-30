import { Product } from "../App";

const Menu = ({ products }: { products: Product[] }) => {
  const rifleSvg = "/assets/rifle.svg";
  const watchSvg = "/assets/watch.svg";
  const glovesSvg = "/assets/gloves.svg";
  const gogglesSvg = "/assets/goggles.svg";
  const capSvg = "/assets/cap.svg"; // New SVG
  const hoodieSvg = "/assets/hoodie.svg"; // New SVG
  const tshirtSvg = "/assets/tshirt.svg"; // New SVG

  const getProductSvg = (title: string) => {
    const lowerTitle = title.toLowerCase();
    console.log(`Mapping title in Menu: ${title}`);
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
    if (lowerTitle.includes("gloves") || lowerTitle.includes("combat gloves")) {
      console.log(`Matched "gloves" or "combat gloves" for ${title}, using glovesSvg`);
      return glovesSvg;
    }
    if (lowerTitle.includes("czapka")) {
      console.log(`Matched "czapka" for ${title}, using capSvg`);
      return capSvg;
    }
    if (lowerTitle.includes("bluza")) {
      console.log(`Matched "bluza" for ${title}, using hoodieSvg`);
      return hoodieSvg;
    }
    if (lowerTitle.includes("koszulka")) {
      console.log(`Matched "koszulka" for ${title}, using tshirtSvg`);
      return tshirtSvg;
    }
    if (lowerTitle.includes("pakiet") || lowerTitle.includes("wirtualny")) {
      console.log(`Matched "pakiet" or "wirtualny" for ${title}, using rifleSvg`);
      return rifleSvg;
    }
    console.log(`No match for ${title}, defaulting to rifleSvg`);
    return rifleSvg; // Default
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl military-font mb-6">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card">
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
        ))}
      </div>
    </div>
  );
};

export default Menu;
