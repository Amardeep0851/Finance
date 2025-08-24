import React, { Suspense } from 'react'

import Header from "@/components/header/Header"

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