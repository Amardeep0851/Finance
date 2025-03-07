"use client"
import React from 'react';
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import WelcomeMessage from "./WelcomeMessage";
import Filter from "./Filter";

function Header() {
  const {user, isLoaded} = useUser();
  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-500 pt-6 pb-36 px-3 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-14 flex w-full items-center justify-between">
          <div className="flex items-center lg:gap-x-16 ">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-5 text-white animate-spin" />
          </ClerkLoading>
        </div>
        <div className="text-white text-xl">
          Welcome {isLoaded && `, ${user?.fullName}`} 
        </div>
        <Filter />
      </div>
    </div>
  )
}

export default Header