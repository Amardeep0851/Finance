"use client"
import React, { useState } from 'react';
import {useMedia} from "react-use"
import { Menu, ClipboardList, UserPen, ChartBarStacked, BadgeIndianRupee, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navbarLinks } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
function Navigation() {

  const isMobile = useMedia("(max-width:1024px)", false);
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter();

  const navbarIconMap:any = {
    ClipboardList:<ClipboardList className="size-4 mr-1" />,
    UserPen:<UserPen className="size-4 mr-1" />,    
    ChartBarStacked:<ChartBarStacked className="size-4 mr-1" />,    
    BadgeIndianRupee:<BadgeIndianRupee className="size-4 mr-1" />,    
    Settings:<Settings className="size-4 mr-1" />,  
  } 

  const onclick = (href:string) => {
      router.push(href);
  }

  const onclickMobileMenu = (href:string) => {
    router.push(href);
    setIsOpen(false);
}
  if(isMobile){
    return (
      <Sheet open={isOpen} onOpenChange={(newState) => setIsOpen(newState)}>
        <SheetTrigger asChild>
          <Button variant="default" onClick={() => setIsOpen(true)}>
          <Menu className="size-5"  />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="">
        <SheetTitle className="hidden"></SheetTitle>
          <div className="pt-10 flex flex-col justify-center gap-y-2">

          {navbarLinks.map((navbar) => (
          
            <Button
            key={navbar.label}
            className={cn("flex items-center justify-center bg-white/10 text-black hover:bg-zinc-100 transition m-0 py-2", pathname===navbar.route && "bg-zinc-200 hover:bg-zinc-200")}
            onClick={() => onclickMobileMenu(navbar.route)}
            >
              
              {navbarIconMap[navbar.icon]}
              {navbar.label}
              
            </Button>
          ))}
          </div>
         
        </SheetContent>
      </Sheet>
    )
  }
  return (
    <div className="flex gap-x-5 flex-row justify-between ">
      {navbarLinks.map((navbar) => (
        <Button
        key={navbar.route}
        onClick={() => onclick(navbar.route)}
        className={cn("bg-white/10 hover:bg-white/20 focus:bg-white/30", pathname===navbar.route && "bg-white/30")}
        >
          {navbar.label}
        </Button>
      ))}
    </div>
  )
}

export default Navigation