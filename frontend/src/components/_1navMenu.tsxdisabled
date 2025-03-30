import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "BROŃ PALNA",
      svg: "/assets/firearm.svg",
      href: "#bron-palna",
      submenu: [
        { label: "PISTOLETY", href: "#pistolety" },
        { label: "REWOLWERY", href: "#rewolwery" },
        { label: "KARABINY", href: "#karabiny" },
      ],
    },
    {
      label: "ODZIEŻ",
      svg: "/assets/clothing.svg",
      href: "#odziez",
      submenu: [
        {
          label: "KOBIETY",
          href: "#kobiety",
          submenu: [
            { label: "KOSZULKI", href: "#kobiety-koszulki" },
            { label: "DŁUGIE RĘKAWY", href: "#kobiety-dlugie-rekawy" },
            { label: "TANKS", href: "#kobiety-tanks" },
            { label: "SPODNIE I SPODENKI", href: "#kobiety-spodnie" },
          ],
        },
        {
          label: "MĘŻCZYŹNI",
          href: "#mezczyzni",
          submenu: [
            { label: "KOSZULKI", href: "#mezczyzni-koszulki" },
            { label: "DŁUGIE RĘKAWY", href: "#mezczyzni-dlugie-rekawy" },
            { label: "BLUZY", href: "#mezczyzni-bluzy" },
            { label: "JEANS I SPODNIE", href: "#mezczyzni-jeans" },
            { label: "KOSZULE", href: "#mezczyzni-koszule" },
            { label: "TANKS", href: "#mezczyzni-tanks" },
            { label: "SZORTY", href: "#mezczyzni-szorty" },
          ],
        },
        {
          label: "OBUWIE",
          href: "#obuwie",
          submenu: [
            { label: "SNEAKERSY", href: "#sneakersy" },
            { label: "BUTY", href: "#buty" },
            { label: "KLAPKI", href: "#klapki" },
            { label: "WKŁADKI DO BUTÓW", href: "#wkladki" },
          ],
        },
        { label: "BLUZY ZADANIOWE", href: "#bluzy-zadaniowe" },
        { label: "PAKIETY MYSTERY", href: "#pakiety-mystery" },
        { label: "CZAPKI I CZAPECZKI", href: "#czapki" },
        { label: "BIELIZNA", href: "#bielizna" },
        { label: "SKARPETKI", href: "#skarpety" },
      ],
    },
    {
      label: "AKCESORIA",
      svg: "/assets/accessories.svg",
      href: "#akcesoria",
      submenu: [{ label: "PASY BOJOWE", href: "#pasy-bojowe" }],
    },
  ];

  const [hoveredSubmenu, setHoveredSubmenu] = useState<string | null>(null);

  // Variants for main menu toggle
  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 0.8, height: "auto", transition: { duration: 0.3 } },
  };

  // Directional variants for each category
  const bronPalnaVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };
  const odziezVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  const akcesoriaVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  // Variants for hover submenus
  const submenuVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: "auto", transition: { duration: 0.3 } },
  };

  return (
    <section className="bg-military-dark py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-orange-400 px-4 py-2 rounded-md military-font"
          >
            {isOpen ? "Ukryj Sklep" : "Sklep"}
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
              {menuItems.map((item) => {
                const variants =
                  item.label === "BROŃ PALNA"
                    ? bronPalnaVariants
                    : item.label === "ODZIEŻ"
                    ? odziezVariants
                    : akcesoriaVariants;

                return (
                  <motion.div
                    key={item.label}
                    className="relative"
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <a
                      href={item.href}
                      className="flex items-center space-x-2"
                      onMouseEnter={() => setHoveredSubmenu(item.label)}
                      onMouseLeave={() => setHoveredSubmenu(null)}
                    >
                      <img src={item.svg} alt={item.label} className="h-5 w-5" />
                      <span className="text-gray-300 hover:text-orange-400 military-font">
                        {item.label}
                      </span>
                    </a>
                    <AnimatePresence>
                      {hoveredSubmenu === item.label && item.submenu.length > 0 && (
                        <motion.div
                          className={`absolute ${
                            item.label === "BROŃ PALNA"
                              ? "right-full top-0 mr-2"
                              : item.label === "ODZIEŻ"
                              ? "top-full left-0 mt-2"
                              : "left-full top-0 ml-2"
                          } bg-military-dark rounded-lg shadow-lg z-10`}
                          variants={submenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                        >
                          <div className="p-4">
                            {item.submenu.map((subItem) => (
                              <div
                                key={subItem.label}
                                className="relative"
                                onMouseEnter={() =>
                                  subItem.submenu && setHoveredSubmenu(`${item.label}-${subItem.label}`)
                                }
                                onMouseLeave={() =>
                                  subItem.submenu && setHoveredSubmenu(item.label)
                                }
                              >
                                <a
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap"
                                >
                                  {subItem.label}
                                </a>
                                <AnimatePresence>
                                  {subItem.submenu &&
                                    hoveredSubmenu === `${item.label}-${subItem.label}` && (
                                      <motion.div
                                        className="absolute left-full top-0 ml-2 bg-military-dark rounded-lg shadow-lg z-10"
                                        variants={submenuVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                      >
                                        <div className="p-4">
                                          {subItem.submenu.map((subSubItem) => (
                                            <a
                                              key={subSubItem.label}
                                              href={subSubItem.href}
                                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap"
                                            >
                                              {subSubItem.label}
                                            </a>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NavMenu;
