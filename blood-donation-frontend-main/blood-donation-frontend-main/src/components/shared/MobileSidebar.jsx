"use client";

import { useEffect } from "react";
import { X, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import NavAuth from "./NavAuth";

const MobileSidebar = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 inset-0 z-50 md:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-0"
        onClick={onClose}
      />
      <SidebarProvider>
        <Sidebar
          side="right"
          variant="floating"
          collapsible="none"
          className="w-[280px] animate-in slide-in-from-left duration-300 top-0 z-50 h-full min-h-screen fixed"
        >
          <SidebarHeader className="flex p-4 border-b mb-2">
            <div className="flex items-center space-x-2">
              <Droplet className="h-6 w-6 text-red-600" />
              <span className="font-semibold text-2xl">
                Hope <span className="text-red-600">Drop</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 absolute right-3 top-3 rounded-full hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/donate-blood" onClick={onClose}>
                    Donate Blood
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/host-blood-drive" onClick={onClose}>
                    Host a Blood Drive
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/types-of-blood-donation" onClick={onClose}>
                    Types of Blood Donation
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/about-us" onClick={onClose}>
                    About Us
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="">
              <NavAuth />
            </div>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};
export default MobileSidebar;
