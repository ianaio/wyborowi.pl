// src/App.tsx
import { useState, FormEvent, useEffect } from "react";
import CheckoutButton from "./components/CheckoutButton";
import Navbar from "./components/Navbar"; // Import Navbar
import "./App.css";

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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
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
      console.error("Login error:", err);
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
    <div>
      <Navbar /> {/* Add Navbar here */}
      {isLoggedIn ? (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-4xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl text-white font-bold">Dashboard 2025</h1>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            </div>
            <p className="text-white mb-4">Welcome, {email}!</p>
            {message ? (
              <p className="text-white mt-4">{message}</p>
            ) : (
              <div className="mt-6">
                {products.length > 0 ? (
                  <ul className="space-y-6">
                    {products.map((product) => (
                      <li key={product.id} className="flex items-center space-x-6">
                        {product.video_url ? (
                          <video
                            src={product.video_url}
                            className="w-32 h-32 object-cover rounded-lg"
                            muted
                            loop
                            autoPlay
                          />
                        ) : (
                          <img
                            src="https://i.imgur.com/EHyR2nP.png"
                            alt={product.title}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold">{product.title}</h3>
                          <p className="text-gray-300 text-sm capitalize">Type: {product.type}</p>
                          <h5 className="text-white">
                            {(product.sale_price || product.price).toFixed(2)} PLN
                            {product.sale_price && (
                              <span className="text-gray-400 line-through ml-2">
                                {product.price.toFixed(2)} PLN
                              </span>
                            )}
                          </h5>
                          {product.video_url && (
                            <a
                              href={product.video_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-sm"
                            >
                              Preview Video
                            </a>
                          )}
                          <CheckoutButton productId={product.id} />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white">No products available.</p>
                )}
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
          <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20">
            <h1 className="text-2xl text-white font-bold mb-6 text-center">
              Login to Wyborowi 2025
            </h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
