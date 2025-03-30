import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: () => void; // Changed to a simple callback since form is in App.tsx
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogin, onLogout }: NavbarProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    {
      label: "WIRUTALNE SZKOLENIE BOJOWE",
      svg: "/assets/combat-training.svg",
      submenu: [
        "SZKOLENIE BOJOWE Z PISTOLETEM",
        "SZKOLENIE BOJOWE Z KARABINEM",
        "SZKOLENIA BOJOWE BEZ BRONI",
        "PRZYGOTOWANIE FIZYCZNE",
      ],
    },
    {
      label: "WIRTUALNE SZKOLENIE PILOTÓW DRONÓW BOJOWYCH",
      svg: "/assets/drone-training.svg",
      submenu: [],
    },
    {
      label: "WIRTUALNE POZWOLENIE NA BROŃ",
      svg: "/assets/permit.svg",
      submenu: ["WIRTUALNE SZKOLENIE PSYCHOLOGÓW"],
    },
    {
      label: "BROŃ PALNA",
      svg: "/assets/firearm.svg",
      submenu: ["PISTOLETY", "REWOLWERY", "KARABINY"],
    },
    {
      label: "AMBASADOR",
      svg: "/assets/ambassador.svg",
      submenu: [],
    },
    {
      label: "KONTAKT",
      svg: "/assets/contact.svg",
      submenu: [],
    },
  ];

  const submenuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 0.9, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <nav className="bg-military-dark shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8" src="/assets/emblem.svg" alt="Logo" />
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenSubmenu(item.label)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <div className="flex flex-col items-center px-1 pt-1 text-gray-300 hover:text-orange-400 military-font">
                    <img src={item.svg} alt={item.label} className="h-6 w-6" />
                    <span className="text-xs mt-1">{item.label}</span>
                  </div>
                  <AnimatePresence>
                    {openSubmenu === item.label && item.submenu.length > 0 && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 bg-military-dark rounded-lg shadow-lg z-10"
                        variants={submenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="grid grid-cols-1 gap-2 p-4">
                          {item.submenu.map((subItem) => (
                            <a
                              key={subItem}
                              href={`#${subItem.toLowerCase().replace(/\s/g, "-")}`}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font"
                            >
                              {subItem}
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium military-font"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium military-font"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
