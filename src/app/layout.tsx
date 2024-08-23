import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/helpers/ToastProvider";
import StoreProvider from "./StoreProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "my portfolio",
  description: "this is personal portfolio of describe my skills.",
  icons: {
    icon: "../picture.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <title>my portfolio</title>
        <link rel="shortcut icon" href="../myfav.webp" type="image/x-icon" />
      </head> */}
      <body className={inter.className}>
        <StoreProvider>
          <ToastProvider>{children}</ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
