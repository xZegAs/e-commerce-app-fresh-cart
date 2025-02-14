import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategories(res?.data?.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Shop popular categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id}>
            <img
              src={category?.image}
              className="w-full h-[200px] object-cover"
              alt=""
            />
            <h4 className="text-center">{category?.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
