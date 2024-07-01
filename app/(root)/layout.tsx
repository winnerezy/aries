import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Bottombar } from "@/components/Bottombar";

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
       <>
        <main className="w-full flex sm:mb-0 mb-12">
          <Sidebar/>
          {children}
        </main>
        <Bottombar/>
       </>
  );
}
