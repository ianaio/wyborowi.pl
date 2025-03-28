// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-lg border-t border-white/20 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-xl font-bold">Wyborowi</h3>
            <p className="text-gray-300 mt-2">
              Szkolenia Bojowe Online - Grom, Navy SEAL, Delta Force
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold">Nawigacja</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  Szkolenia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  Sklep
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold">Kontakt</h4>
            <p className="text-gray-300 mt-2">Email: kontakt@wyborowi.pl</p>
            <p className="text-gray-300">Telefon: +48 123 456 789</p>
            <p className="text-gray-300 mt-2">© 2025 Wyborowi. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
