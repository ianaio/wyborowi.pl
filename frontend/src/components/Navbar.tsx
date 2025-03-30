import { useState, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isLoggedIn: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => void;
}

const Navbar = ({ isLoggedIn, onLogin, onLogout }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
      setIsOpen(false);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

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
      label: "KONTAKT", // Fixed typo from "KONTACT"
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
              <img
                className="h-8 w-8"
                src="/assets/emblem.svg"
                alt="Logo"
              />
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
                onClick={() => setIsOpen(true)}
                className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium military-font"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-military-dark p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white military-font"
                  >
                    Login
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 military-font"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300 military-font"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-orange-400 focus:ring-orange-400 sm:text-sm"
                        required
                      />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-black hover:bg-orange-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 military-font"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        className="ml-4 inline-flex justify-center rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 military-font"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default Navbar;
