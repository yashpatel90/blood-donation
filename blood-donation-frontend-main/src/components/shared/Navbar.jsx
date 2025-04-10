"use client";

import { useState, useEffect } from "react";
import { Menu, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import MobileSidebar from "./MobileSidebar";
import { Link, NavLink, useLocation } from "react-router";
import NavAuth from "./NavAuth";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center space-x-2">
            <Droplet className="h-6 w-6 text-red-600" />
            <span
              className={`font-semibold text-xl ${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              }`}
            >
              Hope <span className="text-red-500">Drop</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/donate-blood"
              className={`${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              } hover:text-red-600 transition-colors`}
            >
              Donate Blood
            </NavLink>
            <NavLink
              to="/host-blood-drive"
              className={`${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              } hover:text-red-600 transition-colors`}
            >
              Host a Blood Drive
            </NavLink>
            <NavLink
              to="/types-of-blood-donation"
              className={`${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              } hover:text-red-600 transition-colors`}
            >
              Types of Blood Donation
            </NavLink>
            <NavLink
              to="/about-us"
              className={`${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              } hover:text-red-600 transition-colors`}
            >
              About Us
            </NavLink>
          </nav>

          <div className="hidden md:block">
            <NavAuth />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu
              className={`h-7 w-7 ${
                isScrolled || !isHomePage ? "text-black" : "text-white"
              } `}
            />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
export default Navbar;
