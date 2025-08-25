import React from "react";
import type { Metadata } from "next";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign up - Finance Tracker - Manage Expenses & Income",
  description: "Track your expenses, income, and savings with Finance Tracker. Simple, secure, and powerful personal finance tool.",
  keywords: ["Finance", "Expense Tracker", "Budget App", "Income Tracker"],
  openGraph: {
    title: "Sign up - Finance Tracker",
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
        <div className="pt-1 pr-0.5 rounded-xl bg-blue-950">
          <SignUp
           routing="hash"
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 text-sm border-none outline-none ring-0",
                footer: "hidden",
              },
            }}
          />
        </div>
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className="size-6 animate-spin text-slate-50" />
      </ClerkLoading>
    </>
  );
}

export default page;
