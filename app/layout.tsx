import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "../styles/globals.css";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aries",
  description: "Aries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
