import Navbar from "./components/Navbar";

export const metadata = {
  title: "ALEA Winkel | Premium Denim & Everyday Wear",
  description: "Toko jeans premium dengan kualitas tinggi dan desain modern.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}