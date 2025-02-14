import React from "react";
import style from "./NotFound.module.css";
import notfound from "../../assets/not-found.svg";

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto py-5">
        <img src={notfound} className="w-1/2 mx-auto" alt="" />
      </div>
    </>
  );
}
