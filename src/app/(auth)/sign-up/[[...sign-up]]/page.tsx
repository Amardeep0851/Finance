import React from "react";
import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

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
