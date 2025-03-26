// src/components/CheckoutButton.tsx
import React from "react";

interface CheckoutButtonProps {
  productId: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ productId }) => {
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found—please log in");

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL received:", data);
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 p-3 bg-white/10 backdrop-blur-md text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
