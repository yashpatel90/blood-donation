import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
