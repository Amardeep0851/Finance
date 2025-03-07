import React from 'react'
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

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