import { useState, FormEvent, useEffect, useRef } from "react";
import CheckoutButton from "./components/CheckoutButton";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import NavMenu from "./components/NavMenu";
import Sklep from "./components/Sklep"; // Import new component

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
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginTimeout, setLoginTimeout] = useState<NodeJS.Timeout | null>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);

  const soldierBg = "/assets/soldier-bg.svg";

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
        setShowLoginForm(false);
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
    setPassword("");
    setMessage("");
    setError("");
    setShowLoginForm(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  const handleMouseOver = (field: "email" | "password") => {
    if (field === "email" && email === "Zaloguj") setEmail("");
    if (field === "password" && password === "Hasło") setPassword("");
    resetLoginTimeout();
  };

  const resetLoginTimeout = () => {
    if (loginTimeout) clearTimeout(loginTimeout);
    const newTimeout = setTimeout(() => {
      setShowLoginForm(false);
      setEmail("");
      setPassword("");
      setError("");
    }, 10000);
    setLoginTimeout(newTimeout);
  };

  const handleInputChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    resetLoginTimeout();
  };

  const handleReturnToHome = () => {
    setShowLoginForm(false);
    setEmail("");
    setPassword("");
    setError("");
    if (loginTimeout) clearTimeout(loginTimeout);
    setLoginTimeout(null);
  };

  useEffect(() => {
    if (showLoginForm && loginInputRef.current) {
      loginInputRef.current.focus();
    }
  }, [showLoginForm]);

  useEffect(() => {
    if (showLoginForm) {
      resetLoginTimeout();
    } else if (loginTimeout) {
      clearTimeout(loginTimeout);
      setLoginTimeout(null);
    }
    return () => {
      if (loginTimeout) clearTimeout(loginTimeout);
    };
  }, [showLoginForm]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/verify-token", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Token invalid or expired");
        })
        .then((data) => {
          setIsLoggedIn(true);
          setEmail(data.email || "");
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          setEmail("");
        });
    }

    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) setMessage("Order placed! You will receive an email confirmation.");
    if (query.get("canceled")) setMessage("Order canceled -- continue shopping and checkout when ready.");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-military-dark">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowLoginForm(true)}
        onLogout={handleLogout}
        onLogoClick={handleReturnToHome}
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
              <h1 className="text-5xl md:text-7xl military-font text-white mb-4">
                MODERN MILITARY THEMED
              </h1>
              <p className="text-lg text-gray-300 w-full md:w-1/2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <button className="mt-6 military-font">Explore Now</button>
            </section>

            <NavMenu />

            <Sklep isLoggedIn={isLoggedIn} /> {/* Replace old section */}

            <Menu products={[]} /> {/* Update if Menu needs products */}
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
              {showLoginForm ? (
                <form onSubmit={handleSubmit} className="w-full md:w-1/2">
                  <div className="mb-4">
                    <input
                      ref={loginInputRef}
                      type="text"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      onMouseOver={() => handleMouseOver("email")}
                      className="text-5xl md:text-7xl military-font bg-transparent border-b border-gray-500 focus:outline-none mb-4 text-white w-full"
                      placeholder="Zaloguj"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      value={password}
                      onChange={handleInputChange(setPassword)}
                      onMouseOver={() => handleMouseOver("password")}
                      className="text-lg bg-transparent border-b border-gray-500 focus:outline-none w-full text-white"
                      placeholder="Hasło"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  <button
                    type="submit"
                    className="mt-6 military-font bg-orange-400 px-4 py-2 rounded-md text-black hover:bg-orange-500"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLoginForm(false)}
                    className="mt-6 ml-4 military-font bg-gray-600 px-4 py-2 rounded-md text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h1 className="text-5xl md:text-7xl military-font text-white mb-4">
                    MODERN MILITARY THEMED
                  </h1>
                  <p className="text-lg text-gray-300 w-full md:w-1/2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <button className="mt-6 military-font">Explore Now</button>
                </>
              )}
            </section>

            <NavMenu />

            <Sklep isLoggedIn={isLoggedIn} /> {/* Replace old section */}

            <Menu products={[]} /> {/* Update if Menu needs products */}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
