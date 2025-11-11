"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AnimatedCircle({CustomClass}:{CustomClass?:string}) {
  const paths = [
    "M33.17,26.33S53.6,4.5,80.28,3.1s49.53,12.89,49.53,12.89l-13.79,17.49s-19.57-6.91-33.53-4.73-31.45,12.26-31.45,12.26l-17.87-14.68Z",
    "M152.69,31.32s22.15,20.07,23.98,46.73c1.83,26.66-12.1,49.73-12.1,49.73l-17.71-13.51s6.6-19.67,4.2-33.6-12.76-31.25-12.76-31.25l14.39-18.1Z",
    "M147.47,152.49s-21.04,21.24-47.75,21.88c-26.71.64-49.14-14.3-49.14-14.3l14.28-17.09s19.36,7.47,33.38,5.69,31.79-11.36,31.79-11.36l17.45,15.18Z",
    "M26.3,145.83S4.49,125.4,3.1,98.72c-1.39-26.68,12.92-49.53,12.92-49.53l17.48,13.8s-6.92,19.56-4.75,33.53c2.17,13.96,12.25,31.46,12.25,31.46l-14.69,17.86Z",
  ];

  return (
    <div className=" ">
      <motion.svg
        viewBox="0 0 180 180"
        width="94"
        height="94"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("rotate-6 opacity-75",CustomClass)}
      >
        {paths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="#88A1D8"
            strokeWidth="6"
            strokeMiterlimit="10"
            // initial={{ pathLength: 0 }}
            // animate={{ pathLength: [0, 1, 0] }}
            initial={{scale:0.8}}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 3,
              delay: i * 0.1,     // slight sequence delay
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
