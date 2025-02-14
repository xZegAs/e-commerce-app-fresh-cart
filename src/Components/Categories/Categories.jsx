import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import PageTitleChange from "../PageTitleChange/PageTitleChange";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  function getCategories() {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategories(res?.data?.data);
        setLoading(false);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <PageTitleChange title="Categories" />
      {loading ? (
        <div className="flex justify-center items-center mx-auto">
          <div className="sk-folding-cube ">
            <div className="sk-cube1 sk-cube" />
            <div className="sk-cube2 sk-cube" />
            <div className="sk-cube4 sk-cube" />
            <div className="sk-cube3 sk-cube" />
          </div>
        </div>
      ) : (
        <section className=" py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Shop by category
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories?.map((category) => (
                <Link
                  key={category._id}
                  to={`/categories`}
                  className="flex items-center rounded-lg border p-8 border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {category?.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
