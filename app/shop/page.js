"use client";

import Image from "next/image";
import { useState } from "react";
import { products } from "../data/products";

export default function Shop() {
  const [success, setSuccess] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeModal, setShowSizeModal] = useState(false);
  const addToCart = (product) => {
  if (!selectedSize) {
    setShowSizeModal(true);
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const index = cart.findIndex(
    (item) =>
      item.id === product.id &&
      item.size === selectedSize
  );

  if (index !== -1) {
    cart[index].qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
};
  return (
    <main className="min-h-screen bg-white  text-black">

      <section className="p-8">
        <a
  href="/"
  className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-white border border-gray-300 rounded-full text-black font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300"
>
  ← Back
</a>
        <h1 className="text-4xl font-bold mb-10 tracking-tight">Collection</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-80">

             <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
               -72%
                </div>
                <Image
               src={product?.images?.[0] || "/banner1.jpeg"}
                alt={product.name}
                 fill
                 className="object-cover"
                 />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  {product.name}
                </h2>

                <div className="mt-2">

               <p className="text-xl font-bold text-black">
               Rp{product.price.toLocaleString("id-ID")}
               </p>
               <p className="text-base text-gray-400 line-through">
                 Rp{product.originalPrice.toLocaleString("id-ID")}
               </p>
               </div>
<div className="mt-3">
  <p className="text-sm font-medium mb-2">Pilih Ukuran</p>

  <div className="flex flex-wrap gap-2">
    {[27, 28, 29, 30, 31, 32, 33, 34].map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`w-10 h-10 border rounded-md text-sm transition ${
          selectedSize === size
            ? "bg-black text-white border-black"
            : "border-gray-300 hover:border-black"
        }`}
      >
        {size}
      </button>
    ))}
  </div>
</div>
                <button
  onClick={() => {
    if (!selectedSize) {
      setShowSizeModal(true);
      return;
    }

    const existing = JSON.parse(localStorage.getItem("cart") || "[]");

    const index = existing.findIndex(
      (item) => item.id === product.id && item.size === selectedSize
    );

    if (index !== -1) {
      existing[index].qty += 1;
    } else {
      existing.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existing));

    window.dispatchEvent(new Event("cartUpdated"));

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  }}
  className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:opacity-80"
>
  Add to Cart
</button>

{showSizeModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[99999]">
    <div className="bg-white text-black px-6 py-5 rounded-2xl text-center w-[280px]">
      <p className="font-semibold text-lg">
        Pilih ukuran terlebih dahulu
      </p>

      <button
        onClick={() => setShowSizeModal(false)}
        className="mt-4 w-full bg-black text-white py-2 rounded-lg"
      >
        OK
      </button>
    </div>
  </div>
)}
              </div>
            </div>
          ))}
        </div>
      </section>
      {success && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-lg">
  ✓ Produk berhasil ditambahkan ke cart
</div>
)}
    </main>
  );
}