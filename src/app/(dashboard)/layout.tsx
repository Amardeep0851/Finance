import React, { Suspense } from 'react'
import type { Metadata } from "next";

import Header from "@/components/header/Header"


export const metadata: Metadata = {
  title: "Finance Tracker",
  robots: {
    index: false, 
    follow: false,
  },
};

interface DashboardProps {
  children:React.ReactNode
}

function DashboardLayout({children}:DashboardProps) {
  return (
    <>
      
      <Header />
      <main className="px-3 lg:px-14">
      {children}</main>
    </>
  )
}

export default DashboardLayout