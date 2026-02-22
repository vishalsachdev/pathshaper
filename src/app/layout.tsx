import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "PathShaper 554 — Data Foundations",
  description: "Instructor cockpit for BADM 554 Data Foundations. Faculty as Shapers on the Path.",
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
