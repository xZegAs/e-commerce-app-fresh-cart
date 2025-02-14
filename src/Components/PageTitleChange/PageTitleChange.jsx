import React, { useEffect } from "react";
import style from "./PageTitleChange.module.css";
import { useLocation } from "react-router-dom";

export default function PageTitleChange({ title }) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
}
