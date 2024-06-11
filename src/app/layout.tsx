import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  metadataBase: new URL("https://siskamling.vercel.app"),
  title: "Siskaming",
  description: "",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} bg-gray-100 h-screen overflow-hidden`}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
