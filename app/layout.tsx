import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/providers/theme-provider";
import React from "react";
import { GeistSans } from "geist/font/sans";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import { ReduxProvider } from "@/app/providers/redux-provider";

export const metadata: Metadata = {
  title: "Xam Company",
  description: "Everything at one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
