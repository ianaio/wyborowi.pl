import React from "react";
import rifleSvg from "../assets/rifle.svg";
import watchSvg from "../assets/watch.svg";
import glovesSvg from "../assets/gloves.svg";
import gogglesSvg from "../assets/goggles.svg";

interface Product {
  id: number;
  title: string;
  price: number;
  sale_price?: number;
  type: string;
  video_url?: string;
}

interface MenuProps {
  products: Product[];
}

const Menu: React.FC<MenuProps> = ({ products }) => {
  const getProductSvg = (title: string) => {
    if (title.toLowerCase().includes("rifle")) return rifleSvg;
    if (title.toLowerCase().includes("watch")) return watchSvg;
    if (title.toLowerCase().includes("gloves")) return glovesSvg;
    if (title.toLowerCase().includes("goggles")) return gogglesSvg;
    return rifleSvg; // Default
  };

  return (
    <div className="bg-military-gray p-10">
      <div className="container mx-auto">
        <h2 className="text-3xl military-font text-center mb-8">
          Nasze Produkty
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              {item.video_url ? (
                <video
                  src={item.video_url}
                  className="w-full h-48 object-cover rounded-lg"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={getProductSvg(item.title)}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded-lg"
                />
              )}
              <h3
                className={`text-xl military-font mt-4 ${
                  item.type === "course" || item.type === "bundle"
                    ? "text-blue-400"
                    : "text-orange-400"
                }`}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {item.type === "course"
                  ? "Kurs szkoleniowy online."
                  : item.type === "bundle"
                  ? "Pakiet kursów w promocyjnej cenie."
                  : "Wysokiej jakości odzież taktyczna."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
