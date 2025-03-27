import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxuryEstates | Find Your Dream Home",
  description: "Discover luxury properties for sale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
