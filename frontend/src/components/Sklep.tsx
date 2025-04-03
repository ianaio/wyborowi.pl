import { useState, useEffect } from "react";
import CheckoutButton from "./CheckoutButton";

interface Product {
  id: number;
  title: string;
  price: number | string;
  sale_price?: number | string;
  type: string;
  video_url?: string;
  category?: string; // Added for filtering
}

const Sklep = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [filter, setFilter] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  // Filter options based on www.wyborowi.pl observation
  const filterOptions = ["All", "Szkolenia Bojowe"]; // Expand based on DB data

  const getProductSvg = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("rifle") || lowerTitle.includes("karabin")) return "/assets/rifle.svg";
    if (lowerTitle.includes("goggles") || lowerTitle.includes("night vision")) return "/assets/goggles.svg";
    if (lowerTitle.includes("watch") || lowerTitle.includes("timepiece")) return "/assets/watch.svg";
    if (lowerTitle.includes("gloves") || lowerTitle.includes("combat gloves")) return "/assets/gloves.svg";
    if (lowerTitle.includes("czapka")) return "/assets/cap.svg";
    if (lowerTitle.includes("bluza")) return "/assets/hoodie.svg";
    if (lowerTitle.includes("koszulka")) return "/assets/tshirt.svg";
    if (lowerTitle.includes("pakiet") || lowerTitle.includes("wirtualny")) return "/assets/rifle.svg";
    return "/assets/rifle.svg";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://www.wyborowi.pl/api/products?category=${encodeURIComponent(filter)}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        const parsedProducts = data.map((product: Product) => ({
          ...product,
          price: Number(product.price),
          sale_price: product.sale_price ? Number(product.sale_price) : undefined,
        }));
        setProducts(parsedProducts);
        setError("");
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
        console.error("Products fetch error:", err);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <section className="p-10 bg-military-dark">
      <h2 className="text-3xl military-font mb-6 text-gray-300 text-center">Sklep</h2>

      {/* Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-military-dark text-gray-300 border border-gray-600 rounded-md p-2 military-font focus:outline-none focus:ring-2 focus:ring-orange-400 w-full max-w-xs"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option} className="text-gray-300">
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
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
              {isLoggedIn && <CheckoutButton productId={product.id} />}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">
          {error ? "Brak produktów w tej kategorii." : "Ładowanie produktów..."}
        </p>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </section>
  );
};

export default Sklep;
