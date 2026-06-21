import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import "./globals.css";
import Script from "next/script";
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

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5TRBQ9WPQF"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5TRBQ9WPQF');
          `}
        </Script>

      </body>
    </html>
  );
}