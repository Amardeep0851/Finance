import React from 'react'
import type { Metadata } from "next";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Sign in - Finance Tracker - Manage Expenses & Income",
  description: "Track your expenses, income, and savings with Finance Tracker. Simple, secure, and powerful personal finance tool.",
  keywords: ["Finance", "Expense Tracker", "Budget App", "Income Tracker"],
  openGraph: {
    title: "Finance Tracker",
    description: "Track expenses & income easily with Finance Tracker.",
    url: "https://finance-jet-six.vercel.app/",
    siteName: "Finance Tracker",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

function page() {
  return (
    <>
      <ClerkLoaded>
        <SignIn afterSignOutUrl="/" 
        routing="hash" 
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm border-none outline-none ring-0',
          footer: "hidden",
          
        },
      }}
      />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-5 animate-spin text-white" />
      </ClerkLoading>
    </>
  )
}

export default page