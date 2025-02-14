import React from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import PageTitleChange from "../PageTitleChange/PageTitleChange";

export default function Home() {
  return (
    <>
      <PageTitleChange title="Home" />
      <MainSlider />
      <CategoriesSlider />
      <div className="container mx-auto px-4 py-16 md:px-12">
        <RecentProducts />
      </div>
    </>
  );
}
