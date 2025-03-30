import { useState, FormEvent, useEffect } from "react";
import CheckoutButton from "./components/CheckoutButton";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import NavMenu from "./components/NavMenu"; // Import the new NavMenu component

interface Product {
  id: number;
  title: string;
  price: number | string;
  sale_price?: number | string;
  type: string;
  video_url?: string;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const [heroTitle, setHeroTitle] = useState("MODERN MILITARY THEMED");
  const [heroDescription, setHeroDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );

  // Define SVG URLs directly
  const soldierBg = "/assets/soldier-bg.svg";
  const rifleSvg = "/assets/rifle.svg";
  const watchSvg = "/assets/watch.svg";
  const glovesSvg = "/assets/gloves.svg";
  const gogglesSvg = "/assets/goggles.svg";

  const getProductSvg = (title: string) => {
    const lowerTitle = title.toLowerCase();
    console.log(`Mapping title: ${title}`); // Log the title being mapped
    if (lowerTitle.includes("rifle")) {
      console.log(`Matched "rifle" for ${title}, using rifleSvg`);
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
    console.log(`No match for ${title}, defaulting to rifleSvg`);
    return rifleSvg; // Default
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const parsedProducts = data.map((product: Product) => ({
        ...product,
        price: Number(product.price),
        sale_price: product.sale_price ? Number(product.sale_price) : undefined,
      }));
      setProducts(parsedProducts);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
      console.error("Products fetch error:", err);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `HTTP error ${response.status}`);
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setEmail(email);
        setError("");
        await fetchProducts();
      } else {
        setError("No token received");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmail("");
    setMessage("");
    setError("");
    setProducts([]);
  };

  useEffect(() => {
    fetchProducts();
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/verify-token", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Token invalid or expired");
          }
        })
        .then((data) => {
          setIsLoggedIn(true);
          setEmail(data.email || "");
          fetchProducts();
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setEmail("");
        });
    }

    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage("Order canceled -- continue shopping and checkout when ready.");
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-military-dark">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {isLoggedIn ? (
          <>
            <section
              className="h-[600px] flex flex-col justify-center items-start p-10"
              style={{
                backgroundImage: `url(${soldierBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(31, 41, 55, 0.8)",
              }}
            >
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="text-5xl md:text-7xl military-font bg-transparent border-b border-gray-500 focus:outline-none mb-4"
              />
              <textarea
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                className="text-lg bg-transparent border-b border-gray-500 focus:outline-none w-full md:w-1/2 resize-none"
                rows={3}
              />
              <button className="mt-6 military-font">Explore Now</button>
            </section>

            {/* Add the new NavMenu component here */}
            <NavMenu />

            <section className="p-10">
              <h2 className="text-3xl military-font mb-6">Dark Mode & Product</h2>
              {message ? (
                <p className="text-white mt-4">{message}</p>
              ) : (
                <div className="mt-6">
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
                          <CheckoutButton productId={product.id} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white">No products available.</p>
                  )}
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
              )}
            </section>

            <Menu products={products} />
          </>
        ) : (
          <>
            <section
              className="h-[600px] flex flex-col justify-center items-start p-10"
              style={{
                backgroundImage: `url(${soldierBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(31, 41, 55, 0.8)",
              }}
            >
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="text-5xl md:text-7xl military-font bg-transparent border-b border-gray-500 focus:outline-none mb-4"
              />
              <textarea
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
                className="text-lg bg-transparent border-b border-gray-500 focus:outline-none w-full md:w-1/2 resize-none"
                rows={3}
              />
              <button className="mt-6 military-font">Explore Now</button>
            </section>

            {/* Add the new NavMenu component here for logged-out users */}
            <NavMenu />

            <section className="p-10">
              <h2 className="text-3xl military-font mb-6">Dark Mode & Product</h2>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-white text-center">Ładowanie produktów...</p>
              )}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </section>

            <Menu products={products} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
