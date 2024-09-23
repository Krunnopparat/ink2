"use client";
import Importance from "@/components/landing/Importance";
import LandingMain from "@/components/landing/LandingMain";
import { useState } from "react";

export default function Home() {
  const [isThai, setIsThai] = useState(true);

  const toggleLanguage = () => {
    setIsThai(!isThai);
  };

  return (
    <>
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
        <div className="snap-center">
          <LandingMain />
        </div>
        <div className="snap-center">
          <Importance/>
        </div>
      </main>
    </>
  );
}
