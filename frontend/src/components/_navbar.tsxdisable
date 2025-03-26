// src/components/Navbar.tsx
import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          Wyborowi
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Menu Items */}
        <ul
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0`}
        >
          {/* Wirtualne Szkolenie Bojowe */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400">Wirtualne Szkolenie Bojowe</span>
            <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
              <li className="px-4 py-2 hover:bg-gray-700">Szkolenie Bojowe z Pistoletem</li>
              <li className="px-4 py-2 hover:bg-gray-700">Szkolenie Bojowe z Karabinem</li>
              <li className="px-4 py-2 hover:bg-gray-700">Szkolenia Bojowe bez Broni</li>
              <li className="px-4 py-2 hover:bg-gray-700">Przygotowanie Fizyczne</li>
            </ul>
          </li>

          {/* Wirtualne Szkolenie Pilotów Dronów Bojowych */}
          <li>
            <a href="#" className="hover:text-blue-400">
              Wirtualne Szkolenie Pilotów Dronów Bojowych
            </a>
          </li>

          {/* Wirtualne Pozwolenie na Broń */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400">Wirtualne Pozwolenie na Broń</span>
            <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
              <li className="px-4 py-2 hover:bg-gray-700">Wirtualne Szkolenie Psychologów</li>
            </ul>
          </li>

          {/* Broń Palna */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400">Broń Palna</span>
            <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
              <li className="px-4 py-2 hover:bg-gray-700">Pistolety</li>
              <li className="px-4 py-2 hover:bg-gray-700">Rewolwery</li>
              <li className="px-4 py-2 hover:bg-gray-700">Karabiny</li>
            </ul>
          </li>

          {/* Odzież */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400">Odzież</span>
            <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
              {/* Kobiety */}
              <li className="relative group/sub">
                <span className="px-4 py-2 block hover:bg-gray-700">Kobiety</span>
                <ul className="absolute left-full top-0 mt-0 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover/sub:block">
                  <li className="px-4 py-2 hover:bg-gray-700">Koszulki</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Długie Rękawy</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Tanks</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Spodnie i Spodenki</li>
                </ul>
              </li>

              {/* Mężczyźni */}
              <li className="relative group/sub">
                <span className="px-4 py-2 block hover:bg-gray-700">Mężczyźni</span>
                <ul className="absolute left-full top-0 mt-0 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover/sub:block">
                  <li className="px-4 py-2 hover:bg-gray-700">Koszulki</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Długie Rękawy</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Bluzy</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Jeans i Spodnie</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Koszule</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Tanks</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Szorty</li>
                </ul>
              </li>

              {/* Obuwie */}
              <li className="relative group/sub">
                <span className="px-4 py-2 block hover:bg-gray-700">Obuwie</span>
                <ul className="absolute left-full top-0 mt-0 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover/sub:block">
                  <li className="px-4 py-2 hover:bg-gray-700">Sneakersy</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Buty</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Klapki</li>
                  <li className="px-4 py-2 hover:bg-gray-700">Wkładki do Butów</li>
                </ul>
              </li>

              <li className="px-4 py-2 hover:bg-gray-700">Bluzy Zadaniowe</li>
              <li className="px-4 py-2 hover:bg-gray-700">Pakiety Mystery</li>
              <li className="px-4 py-2 hover:bg-gray-700">Czapki i Czapeczki</li>
              <li className="px-4 py-2 hover:bg-gray-700">Bielizna</li>
              <li className="px-4 py-2 hover:bg-gray-700">Skarpetki</li>
            </ul>
          </li>

          {/* Akcesoria */}
          <li className="relative group">
            <span className="cursor-pointer hover:text-blue-400">Akcesoria</span>
            <ul className="absolute left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg hidden group-hover:block md:group-hover:block">
              <li className="px-4 py-2 hover:bg-gray-700">Pasy Bojowe z Metalową Klamrą</li>
            </ul>
          </li>

          {/* Static Links */}
          <li>
            <a href="#" className="hover:text-blue-400">
              Ambasador
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Kontakt
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
