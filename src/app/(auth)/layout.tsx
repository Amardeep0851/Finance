"use client"
import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
type props = {
  children: React.ReactNode;
};
function AuthLayout({ children }: props) {
  const router = useRouter();
  const pathname = usePathname();
  const onclickSignIn = () => {
    router.push("/sign-in")
  }
  const onclickSignUp = () => {
    router.push("/sign-up")
  }
  
  return (
    <div className="min-h-screen relative z-30 bg-gradient-to-l to-blue-500 from-blue-800 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-screen">
        <div className=" w-full h-full flex items-center justify-center bg-blue-950/70 backdrop-blur-sm">
            {children}
          </div>
          <div className="flex items-center justify-center flex-col h-full bg-blue-600/40 backdrop-blur-sm">
            <div className="px-10 py-20 bg-blue-900/55 flex items-center justify-center flex-col gap-y-6 rounded-lg">
            <h1 className="text-3xl text-white font-semibold">
              Already have an account?  
              </h1>
              <Button 
              variant="default"
              className="text-base text-white"
              onClick={pathname === "/sign-up" ? () => onclickSignIn() : () => onclickSignUp()}
              >
              {pathname === "/sign-in" ? "Sign Up" : "Sign In"}
              </Button>
            </div>
          </div>
          
        </div>

      
      <div className="flex justify-center items-center ">
        <Image
          src="/images/city-1117433_12802.png"
          alt="Logo"
          className="text-white mix-blend-darken opacity-50 -z-50"
          fill={true}
          objectFit="contain"
          objectPosition="bottom"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
