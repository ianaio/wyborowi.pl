// src/components/Menu.tsx
import React from "react";

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
  return (
    <div className="bg-gray-900 p-4">
      <div className="container mx-auto">
        <h2 className="text-3xl text-white font-bold text-center mb-8">Nasze Produkty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,153,255,0.8)]"
            >
              <h3
                className={`text-xl font-bold ${
                  item.type === "course" || item.type === "bundle" ? "text-blue-400" : "text-orange-400"
                }`}
              >
                {item.title}
              </h3>
              {item.video_url ? (
                <video
                  src={item.video_url}
                  className="w-full h-32 object-cover rounded-lg mt-2"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <div
                  className="w-full h-32 bg-cover bg-center rounded-lg mt-2"
                  style={{ backgroundImage: `url('https://via.placeholder.com/300x150?text=${item.title}')` }}
                ></div>
              )}
              <p className="mt-2 text-sm text-gray-300">
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
