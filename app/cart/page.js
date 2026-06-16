"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const data = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(data);
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const removeItem = (indexToRemove) => {
    const updated = cart.filter((_, index) => index !== indexToRemove);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateQty = (index, change) => {
    const updated = [...cart];

    updated[index].qty = (updated[index].qty || 1) + change;

    if (updated[index].qty <= 0) {
      updated.splice(index, 1);
    }

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return acc + price * qty;
  }, 0);

  const whatsappMessage = encodeURIComponent(
  "Halo Alea,\n\n" +
  "Saya ingin memesan:\n\n" +
  cart
    .map((item) => {
      return `• ${item.name} x${item.qty || 1}\nRp${(
        Number(item.price) * (item.qty || 1)
      ).toLocaleString("id-ID")}`;
    })
    .join("\n\n") +
  `\n\nTotal: Rp${total.toLocaleString("id-ID")}`
);

  return (
  <main className="min-h-screen bg-white text-black p-6">

    <a
      href="/"
      className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
    >
      ← Back
    </a>

    <div className="mb-8">
  <h1 className="text-4xl font-semibold tracking-tight">
    Shopping Cart
  </h1>

  <p className="text-zinc-500 mt-2">
    Review your selected items before checkout.
  </p>
</div>

    {cart.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-24 text-center">

    <div className="text-6xl mb-4">
      🛒
    </div>

    <h2 className="text-2xl font-semibold text-zinc-900">
      Your cart is empty
    </h2>

    <p className="text-zinc-500 mt-2 max-w-sm">
      Looks like you haven't added anything yet.
      Discover our latest collection.
    </p>

    <a
      href="/product"
      className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-zinc-800 transition"
    >
      Start Shopping
    </a>

  </div>
) : (
      
      <>
        {/* LIST CART */}
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div
              key={index}
              className="border border-zinc-200 p-5 rounded-2xl bg-white hover:shadow-md transition-all duration-300 flex gap-4"
            >

              {/* IMAGE */}
              <div className="w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="flex-1">

                <h2 className="font-medium text-zinc-900">
                  {item.name}
                </h2>

                <div className="text-sm text-zinc-500 mt-1 space-y-1">
                  <p>Size: {item.size}</p>
                  <p>
                    Price: Rp{Number(item.price).toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-sm text-gray-500">Qty</span>

                  <button
                    onClick={() => updateQty(index, -1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-zinc-300 text-sm hover:bg-zinc-100 transition"
                  >
                    -
                  </button>

                  <span className="min-w-[20px] text-center font-medium">
                    {item.qty || 1}
                  </span>

                  <button
                    onClick={() => updateQty(index, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-zinc-300 text-sm hover:bg-zinc-100 transition"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold mt-2 text-zinc-900">
                  Subtotal: Rp
                  {(Number(item.price) * (item.qty || 1)).toLocaleString("id-ID")}
                </p>

                <button
                  onClick={() => removeItem(index)}
                  className="mt-3 px-4 py-2 border border-red-500 text-red-500 rounded-full text-sm hover:bg-red-500 hover:text-white transition"
                >
                  Hapus
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* TOTAL (PREMIUM CARD) */}
<div className="mt-10 p-6 border border-zinc-200 rounded-3xl bg-zinc-50">

  <div className="text-sm uppercase tracking-widest text-zinc-400 mb-2">
  Order Summary
</div>

  <div className="flex items-end justify-between">
    <div>
      <div className="text-xs text-zinc-400">
        Total Payment
      </div>

      <div className="text-3xl font-bold text-zinc-900">
        Rp{total.toLocaleString("id-ID")}
      </div>
    </div>

    <div className="text-xs text-zinc-400 text-right">
      includes all items
    </div>
  </div>
</div>

{/* CHECKOUT BUTTON (PREMIUM CTA) */}
<a
  href={`https://wa.me/6287892550636?text=${whatsappMessage}`}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-4 rounded-2xl font-medium tracking-wide hover:bg-zinc-800 hover:scale-[1.02] transition-all duration-300"
>
  <>
  <FaWhatsapp className="text-lg" />
  <span>Checkout via WhatsApp</span>
</>
</a>

{/* SMALL NOTE */}
<p className="text-center text-xs text-zinc-400 mt-3">
  Secure order • Response via WhatsApp
</p>

      </>
    )}

  </main>
);
}