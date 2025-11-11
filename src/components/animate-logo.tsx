"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AnimateLogo({customClass}:{customClass?:string}) {
  const paths = [
    // bottom horizontal line
    { d: "M .02 52.38 L 54.23 52.64", strokeWidth: 7 },

    // three vertical bars
    { d: "M 10.44 34.34 L 10.44 45.57", strokeWidth: 9 },
    { d: "M 27.18 27.38 L 27.18 45.57", strokeWidth: 9 },
    { d: "M 43.38 20.49 L 43.65 45.81", strokeWidth: 9 },

    // arrow line on top
    {
      d: "M 8.14 28.13 L 19.08 13.95 L 26.74 20.66 L 43.51 4.95 L 32.42 4.51 L 47.93 2.91 L 42.44 16.44",
      strokeWidth: 4,
    },
  ];

  return (
    <div className={cn("flex items-center justify-center bg-transparent ",customClass)}>
      <motion.svg
        viewBox="0 0 60 60"
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path.d}
            stroke="#fff"
            strokeWidth={path.strokeWidth}
            fill="none"
            strokeLinecap="inherit"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 2, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.1, // small delay per path for nice sequence feel
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.1,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
