import { ReactNode } from "react";
import { Metadata } from "next";

import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Mango's technical test",
  description: "Marc Pérez Salat",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
