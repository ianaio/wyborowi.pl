import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer: React.FC = () => {
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);

  const dotVariants = {
    initial: { left: "75%" },
    hover: { left: "50%", transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <footer className="bg-white/10 backdrop-blur-lg border-t border-white/20 text-white py-8">
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
              <h3 className="text-xl font-bold">wyborowi.pl</h3>
              <p className="text-gray-300 mt-2">
                Szkolenia Bojowe Online - Grom, Navy SEAL, Delta Force
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold">Nawigacja</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  WIRUTALNE SZKOLENIE BOJOWE
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  WIRTUALNE SZKOLENIE PILOTÓW DRONÓW BOJOWYCH
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  WIRTUALNE POZWOLENIE NA BROŃ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">
                  AMBASADOR
                </a>
              </li>
            </ul>
          </div>

          {/* Sklep Section */}
          <div>
            <h4 className="text-lg font-semibold">Sklep</h4>
            <p className="text-gray-300 mt-2">
              Szkolenia Bojowe Online - Grom, Navy SEAL, Delta Force
            </p>
            <p className="text-gray-300 mt-2">© 2025 Wyborowi. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
