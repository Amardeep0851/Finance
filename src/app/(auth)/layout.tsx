"use client"
import Image from "next/image";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {easeInOut, motion } from "framer-motion"

import {Button} from "@/components/ui/button"
import AnimateLogo from "@/components/animate-logo";
import AnimatedCircle from "@/components/circle";
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
    <div className="min-h-screen relative z-30 bg-gradient-to-t to-blue-700 from-blue-950 px-8 pb-16 ">
      <div className="max-w-[1400px] mx-auto">
  
        <nav>
          <div className="logo flex items-center py-4">
            <AnimateLogo />
            <p className=" ml-0.5 text-2xl text-white font-semibold">
              Finance Tracker
            </p>
          </div>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 min-h-screen">
          <div className=" w-full h-full lg:pt-40 pt-10 pb-10 text-center lg:text-left">
            
            <motion.h1 
            className="text-6xl/tight text-white relative "
            initial={{opacity:0, x:-20}}
            animate={{opacity:1, x:0}}
            >
              
              {pathname.startsWith("/sign-up")
                ? "Track Your Spending and Income Effortlessly"
                : "Welcome Back to Your Finance Tracker"}
                <AnimatedCircle CustomClass="absolute -left-5 lg:-left-7 -top-3 -z-50"/>
            </motion.h1>
            <motion.p 
              className="text-lg/7 text-zinc-200 pt-4"
              initial={{opacity:0, y:20}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.5, delay:0.5, ease:easeInOut}}
              >
              {pathname.startsWith("/sign-up")
                ? "Managing money doesn’t have to be stressful. Once you start tracking your expenses and income, you’ll feel clarity, control, and confidence in every decision."
                : "Continue managing your spending and income with ease. Take control of your financial goals — one entry at a time."}
            </motion.p>
            
          </div>
          <div className="flex lg:items-end items-center flex-col h-full  w-full ">
            <div className="p-10 bg-blue-900/55 flex items-center justify-center flex-col gap-y-6 rounded-lg">
              {children}
              <h2 className="text-3xl text-white font-semibold">
                {pathname.startsWith("/sign-up")
                  ? "Already have an account?"
                  : "Create new account here."}
              </h2>
              <Button
                variant="default"
                className="text-base text-white"
                onClick={
                  pathname === "/sign-up"
                    ? () => onclickSignIn()
                    : () => onclickSignUp()
                }
              >
                {pathname === "/sign-in" ? "Sign Up" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
        </div>
        <div className="overflow-hidden">
          <div className="relative h-[100px] w-[2000px]">
            <div className="size-4 absolute left-80 -top-72  bg-white rounded-full " />

          </div>

          <Image
            src="/images/city-1117433_12802.png"
            alt="Logo"
            className="text-white mix-blend-color-dodge opacity-20 -z-50 "
            fill={true}
            objectFit="contain"
            objectPosition="bottom"
          />

        
      </div>
      
    </div>
  );
}

export default AuthLayout;
