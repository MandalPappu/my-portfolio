import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/utils/ToastProvider";
// import ToastProvider from "@/utils/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: "my portfolio",
  description: "this is personal portfolio of describe my skills.",
  icons: {
    icon: "../myfav.webp", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
