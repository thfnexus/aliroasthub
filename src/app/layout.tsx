import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import WhatsAppChat from "@/components/WhatsAppChat";

export const metadata: Metadata = {
  title: "Ali Roast Hub | Premium Courses & Services",
  description: "Learn Pay Per Call, SEO, and Web Development. Get premium hosting and dashboard access at Ali Roast Hub.",
  icons: {
    icon: [
      { url: "https://i.ibb.co/LDsMnF6S/crazy-boy-removebg-preview.png", sizes: "32x32", type: "image/png" },
      { url: "https://i.ibb.co/LDsMnF6S/crazy-boy-removebg-preview.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "https://i.ibb.co/LDsMnF6S/crazy-boy-removebg-preview.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["https://i.ibb.co/LDsMnF6S/crazy-boy-removebg-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
          <WhatsAppChat />
        </Providers>
      </body>
    </html>
  );
}
