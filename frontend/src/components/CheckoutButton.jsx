// src/components/CheckoutButton.jsx
import React from 'react';

const CheckoutButton = () => {
  const product = { id: 3, title: "Wirtualny Kurs Ukrytego Noszenia GROM", video_url: "https://www.wyborowi.pl/videos/grom-concealed-carry.mp4" };

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
        body: JSON.stringify({ productId: product.id }), // Uses numeric ID 3
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        console.error("No checkout URL received");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
