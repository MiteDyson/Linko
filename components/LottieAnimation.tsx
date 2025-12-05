"use client";

import Lottie from "react-lottie-player";
import animationData from "@/public/animation.json";

export default function LottieAnimation() {
  return (
    <div className="relative flex justify-center items-center py-6 lg:py-10">
      {/* Background Circle Layer - Responsive sizing */}
      <div 
        className="
          absolute 
          w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]
          rounded-full 
          bg-[#00f7da] 
          dark:bg-[#a9d5cf] 
          transition-all duration-300
          -z-10
          opacity-50 lg:opacity-100
        
        "
      />

      {/* Animation Layer - Responsive sizing via class instead of style prop */}
      <Lottie
        loop
        animationData={animationData}
        play
        className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px]"
      />
    </div>
  );
}