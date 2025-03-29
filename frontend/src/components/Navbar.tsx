import React, { useState } from "react";
import emblemSvg from "../assets/emblem.svg";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
      setIsLoginModalOpen(false);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <nav className="bg-military-gray text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={emblemSvg} alt="Emblem" className="w-8 h-8" />
          <a href="/" className="text-2xl military-font">
            Wyborowi
          </a>
        </div>
        {/* Rest of the Navbar code remains the same */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <ul
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:flex md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-military-gray md:bg-transparent p-4 md:p-0`}
          >
            <li className="relative group">
              <span className="cursor-pointer hover:text-gray-400 military-font">
                Wirtualne Szkolenie Bojowe
              </span>
              <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
                <li className="px-4 py-2 hover:bg-gray-700">
                  Szkolenie Bojowe z Pistoletem
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  Szkolenie Bojowe z Karabinem
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  Szkolenia Bojowe bez Broni
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  Przygotowanie Fizyczne
                </li>
              </ul>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-400 military-font"
              >
                Wirtualne Szkolenie Pilotów Dronów Bojowych
              </a>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-gray-400 military-font">
                Wirtualne Pozwolenie na Broń
              </span>
              <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
                <li className="px-4 py-2 hover:bg-gray-700">
                  Wirtualne Szkolenie Psychologów
                </li>
              </ul>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-gray-400 military-font">
                Broń Palna
              </span>
              <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
                <li className="px-4 py-2 hover:bg-gray-700">Pistolety</li>
                <li className="px-4 py-2 hover:bg-gray-700">Rewolwery</li>
                <li className="px-4 py-2 hover:bg-gray-700">Karabiny</li>
              </ul>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-gray-400 military-font">
                Odzież
              </span>
              <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
                <li className="relative group/sub">
                  <span className="px-4 py-2 block hover:bg-gray-700">
                    Kobiety
                  </span>
                  <ul className="absolute left-full top-0 mt-0 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover/sub:block">
                    <li className="px-4 py-2 hover:bg-gray-700">Koszulki</li>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      Długie Rękawy
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700">Tanks</li>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      Spodnie i Spodenki
                    </li>
                  </ul>
                </li>
                <li className="relative group/sub">
                  <span className="px-4 py-2 block hover:bg-gray-700">
                    Mężczyźni
                  </span>
                  <ul className="absolute left-full top-0 mt-0 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover/sub:block">
                    <li className="px-4 py-2 hover:bg-gray-700">Koszulki</li>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      Długie Rękawy
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700">Bluzy</li>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      Jeans i Spodnie
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700">Koszule</li>
                    <li className="px-4 py-2 hover:bg-gray-700">Tanks</li>
                    <li className="px-4 py-2 hover:bg-gray-700">Szorty</li>
                  </ul>
                </li>
                <li className="relative group/sub">
                  <span className="px-4 py-2 block hover:bg-gray-700">
                    Obuwie
                  </span>
                  <ul className="absolute left-full top-0 mt-0 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover/sub:block">
                    <li className="px-4 py-2 hover:bg-gray-700">Sneakersy</li>
                    <li className="px-4 py-2 hover:bg-gray-700">Buty</li>
                    <li className="px-4 py-2 hover:bg-gray-700">Klapki</li>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      Wkładki do Butów
                    </li>
                  </ul>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  Bluzy Zadaniowe
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  Pakiety Mystery
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  Czapki i Czapeczki
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">Bielizna</li>
                <li className="px-4 py-2 hover:bg-gray-700">Skarpetki</li>
              </ul>
            </li>
            <li className="relative group">
              <span className="cursor-pointer hover:text-gray-400 military-font">
                Akcesoria
              </span>
              <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
                <li className="px-4 py-2 hover:bg-gray-700">
                  Pasy Bojowe z Metalową Klamrą
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 military-font">
                Ambasador
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 military-font">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 military-font">
                Kontakt
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="military-font bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="military-font"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-500 text-white">
            <h2 className="text-2xl military-font mb-6 text-center">
              Login to Wyborowi 2025
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <button type="submit" className="w-full military-font">
                Log In
              </button>
            </form>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="mt-4 text-gray-400 hover:text-white w-full text-center military-font"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
