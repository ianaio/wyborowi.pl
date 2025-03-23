// src/App.tsx
import { useState, FormEvent, useEffect } from "react";
import CheckoutButton from "./components/CheckoutButton";
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
        setEmail(email); // Keep email after login
        setError("");
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
          setEmail(data.email || ""); // Assuming backend returns email
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

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-lg w-full max-w-2xl border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl text-white font-bold">Dashboard 2025</h1>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              Logout
            </button>
          </div>
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
              <CheckoutButton />
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
