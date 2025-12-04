"use client";

import Lottie from "react-lottie-player";
import animationData from "@/public/animation.json"; // Ensure you have this file!

export default function LottieAnimation() {
  return (
    <div className="flex justify-center items-center">
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}