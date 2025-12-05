"use client";

import Lottie from "react-lottie-player";
import animationData from "@/public/animation.json"; // Corrected casing to match your file

export default function LottieAnimation() {
  return (
    <div className="relative flex justify-center items-center py-10">
      {/* Background Circle Layer */}
      {/* Absolute positioning ensures this sits behind the Lottie player */}
      <div 
        className="
          absolute 
          w-[350px] h-[350px] 
          rounded-full 
          bg-[#00f7da] 
          dark:bg-[#a9d5cf] 
          transition-colors duration-300
          -z-10
         
        "
      />

      {/* Animation Layer */}
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}