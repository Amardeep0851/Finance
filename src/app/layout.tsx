import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";
import React from 'react';

import './globals.css';
import SheetProvider from "@/providers/sheet-provider";
import Providers from "@/providers/query-provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance Tracker',
  description: 'Track your expenses, income, and savings with Finance Tracker. Simple, secure, and powerful personal finance tool.',
  icons: {
    icon: "/images/logo.png",       // normal tab icon
    shortcut: "/images/logo.png",   // for older browsers
    apple: "/images/logo.png", // iOS home screen
  },
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
         <head>
        <link rel="icon" href="/images/logo.png" sizes="32x32" type="image/png" />
      </head>
      <body className={inter.className}>
        <Providers >
        <Toaster position="bottom-right" />
        <SheetProvider />      
        {children}
        </Providers>
       
      </body>
      </html>
    </ClerkProvider>
  );
}