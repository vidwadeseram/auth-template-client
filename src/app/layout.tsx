import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client Dashboard",
  description: "User dashboard template",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
