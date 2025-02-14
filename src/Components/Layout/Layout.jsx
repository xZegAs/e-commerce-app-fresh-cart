import React from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-between items-center dark:bg-gray-900">
        <Navbar />
        <div className="container items-center justify-center py-20">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
