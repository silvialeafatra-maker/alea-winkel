import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";
import { Abril_Fatface } from "next/font/google";

const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "ALEA Winkel | Fashion Store",
  description:
    "ALEA Winkel - Simple • Comfortable • Everyday Wear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}