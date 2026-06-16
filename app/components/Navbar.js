"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import CartLink from "./CartLink";
import { Menu, X } from "lucide-react";

  export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (

    <nav
  className={`sticky top-0 z-50 w-full transition-all duration-500 ${
    scrolled
      ? "bg-white/80 backdrop-blur-lg border-b border-zinc-200 shadow-sm"
      : "bg-transparent"
  }`}
>
  <div className="relative w-full px-4 md:px-8 py-5 flex items-center">
    {/* Logo */}
    <div className="absolute left-[47%] md:left-[47%] -translate-x-1/2 flex items-center gap-0 whitespace-nowrap">
  <Image
  src="/AleaLogo.png"
  width={scrolled ? 42 : 50}
  height={scrolled ? 42 : 50}
  alt="ALEA Winkel"
  className="transition-all duration-300"
/>

<span className="whitespace-nowrap text-2xl font-bold tracking-[0.02em]">
  ALEA Winkel
</span>
</div>

    {/* Menu Desktop */}
<div className="hidden md:flex items-center gap-8 absolute right-40 text-sm uppercase tracking-wider text-black">
  <a href="/" className="hover:text-gray-500 transition">
    Home
  </a>

  <a href="/shop" className="hover:text-gray-500 transition">
    Shop
  </a>

  <a href="/about" className="hover:text-gray-500 transition">
    About
  </a>

  <a href="/contact" className="hover:text-gray-500 transition">
    Contact
  </a>
</div>

{/* Hamburger kiri */}
<button
  onClick={() => setMenuOpen(!menuOpen)}
  className="md:hidden z-20"
>
  <Menu size={28} />
</button>

{/* Cart kanan */}
<div className="ml-auto flex items-center z-20">
  <CartLink />
</div>
</div>
 {/* Overlay */}
<div
  className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
    menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
  }`}
  onClick={() => setMenuOpen(false)}
/>

{/* Sidebar */}
<div
  className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden ${
    menuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
> <div className="px-8 pb-8">
  <Image
    src="/AleaLogo.png"
    width={80}
    height={80}
    alt="ALEA Winkel"
  />
</div>
  <div className="flex justify-start p-5">
    <button onClick={() => setMenuOpen(false)}>
      <X size={28} />
    </button>
  </div>

  <div className="flex flex-col px-8 gap-6 uppercase tracking-wider text-sm">
    <a href="/" onClick={() => setMenuOpen(false)}>
      Home
    </a>

    <a href="/shop" onClick={() => setMenuOpen(false)}>
      Shop
    </a>

    <a href="/about" onClick={() => setMenuOpen(false)}>
      About
    </a>

    <a href="/contact" onClick={() => setMenuOpen(false)}>
      Contact
    </a>
  </div>
</div>
</nav>
  );
}