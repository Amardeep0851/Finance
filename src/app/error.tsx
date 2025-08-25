"use client";

import type { Metadata } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const metadata:Metadata = {
title:"Error - Finance tracker"
}

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {

  const router = useRouter();

  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-800 px-4">
      <h1 className="text-6xl font-bold text-rose-800">Oops!</h1>
      <p className="mt-4 text-lg">Something went wrong.</p>
      <p className="text-sm text-gray-500">{error.message}</p>

      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-rose-800 px-6 py-2 text-white hover:bg-rose-700 transition"
      >
        Try Again
      </button>
       <button
        onClick={() => router.push("/")}
        className="mt-6 rounded-lg bg-rose-800 px-6 py-2 text-white hover:bg-rose-700 transition"
      >
        Home
      </button>
    </div>
  );
}
