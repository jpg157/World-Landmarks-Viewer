import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { Viewport } from 'next'
import "./globals.css";
import "@/shared/lib/logger";

const roboto_init = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  style: ['normal', 'italic'],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Historical Landmark Discovery App",
  description: "Generated by create next app"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto_init.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
