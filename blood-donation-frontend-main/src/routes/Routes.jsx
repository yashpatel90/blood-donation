import React from "react";
import { Route, Routes } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "@/pages/home/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import DonationTypes from "@/pages/donation-types/DontationTypes";
import AboutUs from "@/pages/about-us/AboutUs";
import Profile from "@/pages/profile/Profile";
import HostBloodDrive from "@/pages/host-blood-drive/HostBloodDrive";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import PendingBloodDrives from "@/pages/pending-blood-drives/PendingBloodDrives";
import DonationHistory from "@/pages/donation-history/DonationHistory";
import DonateBlood from "@/pages/donate-blood/DonateBlood";
import Donors from "@/pages/donors/Donors";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import ManageCenters from "@/pages/manage-centers/ManageCenters";
import BloodDrives from "@/pages/blood-drives/BloodDrives";

const Router = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/types-of-blood-donation" element={<DonationTypes />} />
      <Route
        path="/host-blood-drive"
        element={
          <PrivateRoute role={["user", "admin"]}>
            <HostBloodDrive />
          </PrivateRoute>
        }
      />
      <Route path="/about-us" element={<AboutUs />} />

      <Route
        path="/donate-blood"
        element={
          <PrivateRoute role={["user", "admin"]}>
            <DonateBlood />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute role={["user"]}>
            <Profile />
          </PrivateRoute>
        }
      />
    </Route>
    <Route
      element={
        <PrivateRoute role={["admin"]}>
          <DashboardLayout />
        </PrivateRoute>
      }
    >
      <Route
        path="/dashboard"
        element={
          <PrivateRoute role={["admin"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/pending-blood-drives"
        element={
          <PrivateRoute role={["admin"]}>
            <PendingBloodDrives />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/blood-drives"
        element={
          <PrivateRoute role={["admin"]}>
            <BloodDrives />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/donation-history"
        element={
          <PrivateRoute role={["admin"]}>
            <DonationHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/donors"
        element={
          <PrivateRoute role={["admin"]}>
            <Donors />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/manage-centers"
        element={
          <PrivateRoute role={["admin"]}>
            <ManageCenters />
          </PrivateRoute>
        }
      />
    </Route>
  </Routes>
);

export default Router;
