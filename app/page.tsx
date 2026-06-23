"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { products } from "./data/products";
import { motion } from "framer-motion";


export default function Home() {
  const product = products?.[0];
  const images = product?.images ?? [];

  const [currentBanner, setCurrentBanner] = useState(0);
const [currentImage, setCurrentImage] = useState(0);
  const banners = [
  "/AleaBanner.webp",
  "/Banner2.jpeg",
  "/Banner3.jpeg",
];
  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  }, 4000);

  return () => clearInterval(interval);
}, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || images.length === 0) return;

    const diff = startX.current - e.clientX;

    if (diff > 50) {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }

    if (diff < -50) {
      setCurrentImage((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }

    isDragging.current = false;
  };

  return (
    <main className="min-h-screen bg-white text-black">
    <section className="relative w-full aspect-[16/9] overflow-hidden">
  <div
    className="flex h-full transition-transform duration-700 ease-in-out"
    style={{
      transform: `translateX(-${currentImage * 100}%)`,
    }}
  >
    {banners.map((banner, index) => (
      <div key={index} className="relative w-full flex-shrink-0">
        <Image
          src={banner}
          alt={`Banner ${index + 1}`}
          fill
          priority
          className="object-cover object-[50%_20%]"
        />
      </div>
    ))}
  </div>
</section>

      {/* HERO */}
      <motion.section
      className="flex flex-col items-center justify-center text-center py-32 px-6"
  initial={{ opacity: 0, y: 80 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 1 }}
>
        <p className="uppercase tracking-[0.3em] text-gray-600 mb-4">
          Premium Fashion Store
        </p>

        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          ALEA Winkel
        </h2>

        <p className="max-w-md text-gray-600 text-sm uppercase tracking-[0.2em] mb-10">
          Simple • Comfortable • Everyday Wear
        </p>

        <div className="flex gap-6">
          <a
  href="/shop"
  className="bg-black text-white px-8 py-3 rounded-full font-medium hover:opacity-80 transition inline-block"
>
  Shop Now
</a>
          <a
  href="https://wa.me/6287892550636"
  target="_blank"
  className="bg-white text-black border border-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-all duration-300 inline-block"
>
  WhatsApp
</a>

        </div>
</motion.section>


     <motion.section
  className="max-w-6xl mx-auto px-6 py-16"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
>
  <div className="text-center mb-10">
    <h2 className="text-3xl font-semibold">
      Why Choose ALEA Winkel
    </h2>

    <p className="text-zinc-500 mt-3">
      Simple • Comfortable • Everyday Wear
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="border border-zinc-200 rounded-3xl p-6">
      <h3 className="font-semibold mb-2">
        Premium Denim
      </h3>

      <p className="text-sm text-zinc-500">
        Comfortable materials selected for daily wear.
      </p>
    </div>

    <div className="border border-zinc-200 rounded-3xl p-6">
      <h3 className="font-semibold mb-2">
        Best Seller Design
      </h3>

      <p className="text-sm text-zinc-500">
        Modern baggy fit suitable for various styles.
      </p>
    </div>

    <div className="border border-zinc-200 rounded-3xl p-6">
      <h3 className="font-semibold mb-2">
        Fast Response
      </h3>

      <p className="text-sm text-zinc-500">
        Quick support and ordering via WhatsApp.
      </p>
    </div>

  </div>
</motion.section>

      {/* PRODUCT */}
      <section className="px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Featured Product
          </h3>

          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              {/* SLIDER */}
              <div
  className="relative h-[500px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
  onPointerDown={handlePointerDown}
  onPointerUp={handlePointerUp}
> <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
  -72%
</div>

                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentImage * 100}%)`,
                  }}
                >
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full h-[500px] flex-shrink-0"
                    >
                      <Image
  src={img}
  alt="product"
  fill
  draggable={false}
  className="object-contain bg-white"
/>
                    </div>
                  ))}
                </div>

                {/* DOTS */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentImage === index
                          ? "bg-white scale-125"
                          : "bg-gray-500 opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* TEXT */}
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">
  Jeans Baggy Whisker - Black
</h4>

<p className="text-gray-600 mb-4">
  Simple • Comfortable • Everyday Wear
</p>

<div className="mb-4">
  <p className="text-sm text-gray-400 line-through">
    Rp260.000
  </p>

  <p className="text-2xl font-bold">
    Rp99.999
  </p>
</div>

                <a
  href="/product"
  className="block w-full bg-black text-white py-3 rounded-full font-medium text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
>
  Lihat Detail
</a>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-16">

  <div className="bg-black text-white rounded-3xl p-8 text-center">



    <p className="text-sm tracking-widest uppercase text-zinc-400">

      Limited Stock

    </p>



    <h2 className="text-3xl font-semibold mt-3">

      Best Seller Jeans Available Now

    </h2>



    <p className="mt-3 text-zinc-300">

      Get yours before the next restock.

    </p>



  </div>
</section>
      <section className="py-20 px-6 bg-gray-50">
  <div className="max-w-6xl mx-auto">

    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-light tracking-wide">
        CUSTOMER REVIEWS
      </h2>

      <div className="w-16 h-[1px] bg-black mx-auto my-6" />

      <p className="text-gray-500">
        Ulasan dari pelanggan Alea
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-yellow-500 mb-4">★★★★★</div>

        <p className="text-gray-700">
          "Bahannya tebal tetapi tetap nyaman dipakai dan tidak kaku.
          Kualitasnya benar-benar di atas ekspektasi."
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Pembeli Terverifikasi
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-yellow-500 mb-4">★★★★★</div>

        <p className="text-gray-700">
          "Kualitas produknya the best!
          Ini sudah pembelian ketiga saya dan selalu puas."
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Pembeli Terverifikasi
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-yellow-500 mb-4">★★★★★</div>

        <p className="text-gray-700">
          "Celananya keren, tidak salah pilih toko ini.
          Sepertinya bakal jadi langganan terus."
        </p>

        <p className="mt-6 text-sm text-gray-500">
          Pembeli Terverifikasi
        </p>
      </div>

    </div>

  </div>
</section>
     <footer className="border-t border-gray-200 mt-20">
  <div className="max-w-6xl mx-auto px-8 py-12">

    <div className="text-center">

      {/* LOGO */}
      <div className="flex justify-center items-center gap-1 md:gap-1 text-sm md:text-base">
        <Image
          src="/AleaLogoBlack.png"
          alt="ALEA Winkel"
          width={50}
          height={50}
        />

        <h3 className="text-2xl font-bold tracking-wide">
          ALEA Winkel
        </h3>
      </div>

      <p className="text-gray-500 mt-3">
        Simple • Comfortable • Everyday Wear
      </p>

      <div className="mt-8 flex justify-center gap-8 text-2xl text-gray-500">

  <a
    href="https://www.instagram.com/aleawinkel?igsh=d3lncDRrZnd3ZXpp&utm_source=qr"
    className="hover:text-black hover:scale-110 transition-all duration-300"
    aria-label="Instagram"
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.tiktok.com/@aleawinkel"
    className="hover:text-black hover:scale-110 transition-all duration-300"
    aria-label="TikTok"
  >
    <FaTiktok />
  </a>

  <a
    href="https://wa.me/6287892550636"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-black hover:scale-110 transition-all duration-300"
    aria-label="WhatsApp"
  >
    <FaWhatsapp />
  </a>

</div>

      <div className="mt-10 text-sm text-gray-400">
        © 2026 ALEA Winkel. All rights reserved.
      </div>

    </div>

  </div>
</footer>

    </main>
  );
}