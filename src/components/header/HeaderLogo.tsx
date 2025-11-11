"use client"
import Image from "next/image"
import React from 'react'
import AnimateLogo from "../animate-logo"

function HeaderLogo() {
  return (
    <div className="hidden lg:flex items-start">
      <AnimateLogo customClass="pt-1.5" />
      <p className=" ml-0.5 text-2xl text-white font-semibold">Finance Tracker</p>
    </div>
  )
}

export default HeaderLogo