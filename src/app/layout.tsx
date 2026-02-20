import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "PathShaper — Learning 3.0 Prototype",
  description: "Faculty as Shapers on the Path: A proof of concept for adaptive learning architecture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
