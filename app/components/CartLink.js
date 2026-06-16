"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartLink() {
  const [count, setCount] = useState(0);

  const updateCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    setCount(total);
  };

  useEffect(() => {
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  return (
    <Link href="/cart" className="relative flex items-center cursor-pointer">
      
      🛒

      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}