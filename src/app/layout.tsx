import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/component/navbar";
import TrendingProducts from "./component/TrendingProducts";

export const metadata: Metadata = {
  title: "Price Sky",
  description: "A way to reduce your expense",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {<Navbar />}
        {children}
        {<TrendingProducts />}
      </body>
    </html>
  );
}
