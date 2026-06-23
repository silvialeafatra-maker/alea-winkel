"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  "/AleaBanner.webp",
  "/Banner2.jpeg",
  "/Banner3.jpeg",
];

export default function BannerZara() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-[85vh] flex items-center bg-white">
      
      {/* LEFT TEXT SECTION */}
      <div className="w-1/2 px-16">
        <h1 className="text-5xl font-light tracking-wide">
          ALEA JEANS
        </h1>

        <p className="mt-4 text-gray-600">
          Premium denim collection for modern lifestyle.
        </p>

        <button className="mt-8 px-6 py-3 bg-black text-white hover:opacity-80 transition">
          Shop Now
        </button>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div className="w-1/2 relative h-[85vh] overflow-hidden">
        <Image
          src={banners[index]}
          alt="banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}