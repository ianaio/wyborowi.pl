import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "BROŃ PALNA", svg: "/assets/firearm.svg", href: "#bron-palna" },
    { label: "ODZIEŻ", svg: "/assets/clothing.svg", href: "#odziez" },
    { label: "AKCESORIA", svg: "/assets/accessories.svg", href: "#akcesoria" },
  ];

  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 0.8, height: "auto", transition: { duration: 0.3 } },
  };

  return (
    <section className="bg-military-dark py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-orange-400 px-4 py-2 rounded-md military-font"
          >
            {isOpen ? "Ukryj Menu" : "Pokaż Menu"}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="flex justify-center space-x-8 mt-4"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center"
                >
                  <img src={item.svg} alt={item.label} className="h-5 w-5" />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NavMenu;
