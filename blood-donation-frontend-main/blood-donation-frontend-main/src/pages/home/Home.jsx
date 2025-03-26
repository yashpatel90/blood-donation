import EligibilityChecker from "@/components/home/EligibilityChecker";
import HeroSection from "@/components/home/HeroSection";
import React from "react";

const Home = () => {
  return (
    <div className="text-red-500">
      <HeroSection />
      <EligibilityChecker />
    </div>
  );
};

export default Home;
