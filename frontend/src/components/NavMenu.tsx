import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openOdziezSubmenu, setOpenOdziezSubmenu] = useState<string | null>(null);
  const [isObuwieOpen, setIsObuwieOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All"); // Filter state

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

  // Filter options
  const filterOptions = ["All", "Broń Palna", "Odzież", "Akcesoria"];

  // Filter menu items based on selection
  const filteredItems = filter === "All" ? menuItems : menuItems.filter(item => item.label === filter.toUpperCase());

  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { opacity: 0.8, height: "auto", transition: { duration: 0.3 } },
  };

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

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
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
              className="flex flex-col items-center space-y-4 mt-4"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Filter Dropdown */}
              <div className="w-full max-w-xs">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full bg-military-dark text-gray-300 border border-gray-600 rounded-md p-2 military-font focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option} className="text-gray-300">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtered Menu Items */}
              <div className="flex justify-center space-x-8">
                {filteredItems.map((item) => {
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
                      <button
                        onClick={() =>
                          setOpenSubmenu(openSubmenu === item.label ? null : item.label)
                        }
                        className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 military-font"
                      >
                        <img src={item.svg} alt={item.label} className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                      <AnimatePresence>
                        {openSubmenu === item.label && item.submenu.length > 0 && (
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
                              {item.label === "ODZIEŻ" ? (
                                <>
                                  {item.submenu.map((subItem) =>
                                    subItem.label === "OBUWIE" ? (
                                      <div key={subItem.label}>
                                        <button
                                          onClick={() => setIsObuwieOpen(!isObuwieOpen)}
                                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap w-full text-left"
                                        >
                                          {subItem.label}
                                        </button>
                                        <AnimatePresence>
                                          {isObuwieOpen && subItem.submenu && (
                                            <motion.div
                                              className="ml-4"
                                              variants={submenuVariants}
                                              initial="hidden"
                                              animate="visible"
                                              exit="hidden"
                                            >
                                              {subItem.submenu.map((subSubItem) => (
                                                <a
                                                  key={subSubItem.label}
                                                  href={subSubItem.href}
                                                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap"
                                                >
                                                  {subSubItem.label}
                                                </a>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ) : subItem.label === "KOBIETY" || subItem.label === "MĘŻCZYŹNI" ? (
                                      <div key={subItem.label}>
                                        <button
                                          onClick={() =>
                                            setOpenOdziezSubmenu(
                                              openOdziezSubmenu === subItem.label ? null : subItem.label
                                            )
                                          }
                                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap w-full text-left"
                                        >
                                          {subItem.label}
                                        </button>
                                        <AnimatePresence>
                                          {openOdziezSubmenu === subItem.label && subItem.submenu && (
                                            <motion.div
                                              className="ml-4"
                                              variants={submenuVariants}
                                              initial="hidden"
                                              animate="visible"
                                              exit="hidden"
                                            >
                                              {subItem.submenu.map((subSubItem) => (
                                                <a
                                                  key={subSubItem.label}
                                                  href={subSubItem.href}
                                                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap"
                                                >
                                                  {subSubItem.label}
                                                </a>
                                              ))}
                                            </motion.div>
                                          )}
                                        </AnimatePresence>
                                      </div>
                                    ) : (
                                      <a
                                        key={subItem.label}
                                        href={subItem.href}
                                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap"
                                      >
                                        {subItem.label}
                                      </a>
                                    )
                                  )}
                                </>
                              ) : (
                                item.submenu.map((subItem) => (
                                  <a
                                    key={subItem.label}
                                    href={subItem.href}
                                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg military-font whitespace-nowrap"
                                  >
                                    {subItem.label}
                                  </a>
                                ))
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default NavMenu;
