"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import WhatsAppButton from "./WhatsAppButton";

export default function LayoutWrapper({
  children,
}) {
  const pathname = usePathname();

  const isAdmin =
    pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      {children}

      {!isAdmin && (
        <WhatsAppButton />
      )}
    </>
  );
}