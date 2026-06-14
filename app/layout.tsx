import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Вікторія & Олександр — Наше Весілля",
  description: "Запрошення на наше весілля, яке відбудеться 24 серпня 2026 року. Будемо раді розділити цей особливий день з вами!",
  openGraph: {
    title: "Вікторія & Олександр — Наше Весілля",
    description: "Запрошення на наше весілля, яке відбудеться 24 серпня 2026 року. Будемо раді розділити цей особливий день з вами!",
    images: [
      {
        url: "/og-image.jpg", // The image should be placed in the public folder as og-image.jpg
        width: 1200,
        height: 630,
        alt: "Вікторія та Олександр",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-800">
        {children}
      </body>
    </html>
  );
}
