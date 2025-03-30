import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer: React.FC = () => {
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);
  const [isEmailHovered, setIsEmailHovered] = React.useState(false);
  const [isPhoneHovered, setIsPhoneHovered] = React.useState(false);

  const dotVariants = {
    initial: { left: "75%" },
    hover: { left: "50%", transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const envelopeFlapVariants = {
    initial: { rotate: 0 },
    hover: { rotate: -135, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  const phoneReceiverVariants = {
    initial: { y: 0 },
    hover: { y: -10, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <footer className="bg-white/10 backdrop-blur-lg border-t border-white/20 text-white/70 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding with Logo and Crosshair */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 flex items-center relative mr-4"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <img
                className="h-8 w-8"
                src="/assets/emblem.svg"
                alt="Wyborowi Logo"
              />
              <AnimatePresence>
                {isLogoHovered && (
                  <motion.div
                    className="absolute"
                    style={{
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "8px",
                      height: "8px",
                      backgroundColor: "red",
                      borderRadius: "50%",
                    }}
                    variants={dotVariants}
                    initial="initial"
                    animate="hover"
                    exit="initial"
                  />
                )}
              </AnimatePresence>
            </div>
            <div>
              <h3 className="text-lg font-bold">wyborowi.pl</h3>
              <p className="text-sm text-gray-300/70 mt-2">
                Szkolenia Bojowe Online - Grom, Navy SEAL, Delta Force
              </p>
              <div
                className="flex items-center mt-2"
                onMouseEnter={() => setIsEmailHovered(true)}
                onMouseLeave={() => setIsEmailHovered(false)}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300/70 mr-2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                  <motion.path
                    d="M2 4L12 12L22 4"
                    variants={envelopeFlapVariants}
                    initial="initial"
                    animate={isEmailHovered ? "hover" : "initial"}
                  />
                  <path d="M2 20L12 12L22 20" />
                </motion.svg>
                <p className="text-sm text-gray-300/70">
                  <a
                    href="mailto:wirutalneszkoleniabojowe@wyborowi.pl"
                    className="hover:text-blue-400"
                  >
                    wirutalneszkoleniabojowe@wyborowi.pl
                  </a>
                </p>
              </div>
              <div
                className="flex items-center mt-2"
                onMouseEnter={() => setIsPhoneHovered(true)}
                onMouseLeave={() => setIsPhoneHovered(false)}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gray-300/70 mr-2"
                >
                  <rect x="6" y="8" width="12" height="10" rx="2" fill="red" />
                  <motion.path
                    d="M4 6h16v4H4z"
                    fill="red"
                    variants={phoneReceiverVariants}
                    initial="initial"
                    animate={isPhoneHovered ? "hover" : "initial"}
                  />
                </motion.svg>
                <p className="text-sm text-gray-300/70">
                  <a href="tel:+48537606137" className="hover:text-blue-400">
                    537 606 137
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-base font-semibold">Nawigacja</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  WIRUTALNE SZKOLENIE BOJOWE
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  WIRTUALNE SZKOLENIE PILOTÓW DRONÓW BOJOWYCH
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  WIRTUALNE POZWOLENIE NA BROŃ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  AMBASADOR
                </a>
              </li>
            </ul>
          </div>

          {/* Sklep Section */}
          <div>
            <h4 className="text-base font-semibold">Sklep</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  Warunki korzystania
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  Regulamin sprzedaży
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  Dane firmy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  Polityka prywatności i zasady dotyczące plików cookie
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-300/70 hover:text-blue-400">
                  Ustawienia prywatności i zasad dotyczących plików cookie
                </a>
              </li>
            </ul>
            <p className="text-sm text-gray-300/70 mt-2">© 2025 Wyborowi. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
