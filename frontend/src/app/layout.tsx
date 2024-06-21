import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation/Navigation"
import {Providers} from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bass Harbor",
  description: "for all your low end needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Navigation />
          <div className="flex text-lg pt-8 px-20 justify-center text-center">
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
