"use client"
import Image from "next/image"
import React from 'react'

function HeaderLogo() {
  return (
    <div className="hidden lg:flex items-start">
      <Image src="/images/logo.png" alt="Logo" width={24} height={24} className="pt-1" />
      <p className=" ml-0.5 text-2xl text-white font-semibold">Finance</p>
    </div>
  )
}

export default HeaderLogo