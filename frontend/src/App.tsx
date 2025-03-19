import { useState, FormEvent, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
        setError("");
      } else {
        setError("No token received");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
      console.error("Login error:", err);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: "grom-concealed-carry" }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `HTTP error ${response.status}`);
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        setError("No checkout URL received");
      }
    } catch (err: any) {
      setError(err.message || "Checkout failed");
      console.error("Checkout error:", err);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage("Order canceled -- continue shopping and checkout when ready.");
    }
  }, []);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-2xl border border-white/20">
          <h1 className="text-3xl text-white font-bold mb-4">Dashboard 2025</h1>
          <p className="text-white">Welcome, {email}!</p>
          {message ? (
            <p className="text-white mt-4">{message}</p>
          ) : (
            <div className="mt-6">
              <div className="product">
                <img
                  src="https://i.imgur.com/EHyR2nP.png"
                  alt="Grom Concealed Carry"
                  className="w-32 h-32 mb-4"
                />
                <div className="description">
                  <h3 className="text-white">Grom Concealed Carry</h3>
                  <h5 className="text-white">149.99 PLN</h5>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Checkout
              </button>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default App;
