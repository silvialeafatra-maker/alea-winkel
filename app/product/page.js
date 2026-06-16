"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { products } from "../data/products";
export default function ProductPage() {
  const images = [
    "/IMG_2579.jpeg",
    "/IMG_2726.jpeg",
    "/IMG_2618.jpeg",
  ];
  const [mounted, setMounted] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  const [mainImage, setMainImage] = useState(0);
  const [toast, setToast] = useState("");
  const [errorToast, setErrorToast] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const product = products.find((p) => p.id === 1);


  const addToCart = () => {
  if (typeof window === "undefined") return;
  if (!selectedSize) {
    setShowSizeModal(true);
    return;
  }

  const existing = JSON.parse(localStorage.getItem("cart") || "[]");

  const index = existing.findIndex(
    (item) => item.id === 1 && item.size === selectedSize
  );

  if (index !== -1) {
    existing[index].qty = (existing[index].qty || 1) + 1;
  } else {
    existing.push({
      id: 1,
      name: "Jeans Baggy Whisker - Black",
      price: 99999,
      size: selectedSize,
      qty: 1,
      image: images[mainImage],
    });
  }

  localStorage.setItem("cart", JSON.stringify(existing));
  window.dispatchEvent(new Event("cartUpdated"));

  setToast("✓ Produk berhasil ditambahkan ke cart");

  setTimeout(() => setToast(""), 2000);
};

  return (
    <main className="min-h-screen bg-white  text-black px-6 py-10">
        

      {/* BACK */}
      <a
  href="/"
  className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-white border border-gray-300 rounded-full text-black font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300"
>
  ← Back
</a>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mt-8">

        {/* IMAGE */}
        <div>
          <div className="relative w-full h-[500px] border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
  -72%
</div>
            <Image
              src={images[mainImage]}
              alt="product"
              fill
              className="object-contain bg-white"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(index)}
                className={`relative w-20 h-20 cursor-pointer border rounded-lg overflow-hidden ${
                  mainImage === index
                    ? "border-black"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={img}
                  alt="thumb"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <div className="md:sticky md:top-24 h-fit"></div>
          <h1 className="text-3xl font-bold">
            Jeans Baggy Whisker - Black
          </h1>

          <p className="text-gray-600 mt-2">
            Simple • Comfortable • Everyday Wear
          </p>

          {/* SIZE */}
<div className="mt-6">
  <h3 className="font-semibold mb-3">
    Pilih Ukuran
  </h3>

  <div className="flex flex-wrap gap-2">
  {[27, 28, 29, 30, 31, 32, 33, 34].map((size) => (
    <button
      key={size}
      onClick={() => setSelectedSize(size)}
      className={`w-14 h-14 rounded-xl border transition-all duration-200 ${
        selectedSize === size
          ? "bg-black text-white border-black"
          : "border-zinc-300 hover:border-black"
      }`}
    >
      {size}
    </button>
  ))}
</div>
</div>

  <div className="mt-5">
  <p className="text-sm text-zinc-400 line-through">
    Rp{product?.originalPrice?.toLocaleString("id-ID")}
  </p>

  <div className="flex items-center gap-3 mt-1">
    <p className="text-4xl font-semibold text-zinc-900">
      Rp{product?.price?.toLocaleString("id-ID")}
    </p>

    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
      SAVE 72%
    </span>
  </div>
</div>
<div className="mt-4 flex flex-wrap gap-2 text-xs">
  <span className="px-3 py-1 bg-zinc-100 rounded-full">
    Premium Denim
  </span>

  <span className="px-3 py-1 bg-zinc-100 rounded-full">
    Everyday Wear
  </span>

  <span className="px-3 py-1 bg-zinc-100 rounded-full">
    Best Seller
  </span>
  
</div>
          <div className="mt-8 space-y-3">

            <button
              onClick={addToCart}
              className="w-full bg-black text-white py-4 rounded-2xl font-medium tracking-wide hover:bg-zinc-800 transition-all"
            >
              Add to Cart
            </button>

            <button
  onClick={() => {
  if (!selectedSize) {
    setShowSizeModal(true);
    return;
  }

  window.open(
    `https://wa.me/6287892550636?text=Halo saya mau beli Jeans Baggy Whisker - Black ukuran ${selectedSize}`,
    "_blank"
  );
}}
  className="w-full bg-white text-black border border-black py-4 rounded-2xl font-medium hover:bg-black hover:text-white transition-all"
>
  Buy Now
</button>

          </div>
        </div>

      </div>
      {toast && (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold z-[9999]">
    {toast}
  </div>
)}

{typeof window !== "undefined" && errorToast && mounted &&
  createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[99999]">
      <div className="bg-red-600 text-white px-6 py-4 rounded-xl text-lg font-semibold">
        {errorToast}
      </div>
    </div>,
    document.body
  )
}
{showSizeModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[99999]">
    <div className="bg-white text-black px-6 py-5 rounded-2xl shadow-xl text-center w-[280px]">
      
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
    </main>
    
  );
}