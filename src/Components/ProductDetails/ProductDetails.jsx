import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import PageTitleChange from "../PageTitleChange/PageTitleChange";

export default function ProductDetails() {
  const { id, category } = useParams();
  const [imgIsLoading, setimgIsLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const {
    addProductToCart,
    addProductToWishlist,
    getLoggedUserWishlist,
    wishlist,
    setWishlist,
  } = useContext(CartContext);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function handleAddToCart(productId) {
    setCurrentId(productId);
    setLoading(true);
    const res = await addProductToCart(productId);
    // console.log(res.data);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      setLoading(false);
    } else {
      toast.error(res.data.message);
      setLoading(false);
    }
  }

  function getSingleProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        // console.log(res.data.data);
        setProduct(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let relatedProducts = res.data.data.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(relatedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleGetLoggedUserWishlist(productId) {
    const res = await getLoggedUserWishlist(productId);
    // console.log(res.data.data);
    if (res.data.status === "success") {
      setWishlist(res.data.data);
      wishlist?.forEach((element) => {
        setWishlistIds((prev) => [...prev, element.id]);
      });
    }
  }

  useEffect(() => {
    getSingleProduct(id);
    getRelatedProducts();
    handleGetLoggedUserWishlist();
  }, [id, category, wishlist, wishlistIds]);

  async function handleAddToWishlist(productId) {
    const res = await addProductToWishlist(productId);
    // console.log(res.data);
    if (res.data.status === "success") {
      toast.success(res.data.message);
      setLoading(false);
    } else {
      toast.error(res.data.message);
      setLoading(false);
    }
  }

  return (
    <>
      <PageTitleChange title="Product Details" />
      {product ? (
        <section className="py-8 mt-16 bg-white md:py-16 dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
              <div className="shrink-0 max-w-md lg:max-w-lg mx-auto lg:mx-0 xl:px-16 mb-12 lg:mb-0 aspect-[3/4] lg:aspect-auto lg:h-full ">
                {product?.images && product?.images.length > 1 ? (
                  <Slider {...settings}>
                    {product?.images.map((src) => (
                      <img
                        key={src}
                        className="w-full h-full object-cover aspect-[3/4] lg:aspect-auto rounded-2xl"
                        src={src}
                        alt=""
                      />
                    ))}
                  </Slider>
                ) : (
                  <img
                    className="w-full h-full object-cover aspect-[3/4] lg:aspect-auto rounded-2xl "
                    src={product?.imageCover}
                    alt=""
                  />
                )}
              </div>
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {product?.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    EGP {product?.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <span>
                      <i className="fa-solid fa-star text-yellow-400"></i>
                    </span>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      {product?.ratingsAverage}
                    </p>
                  </div>
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <button
                    onClick={() => handleAddToWishlist(product.id, product)}
                    title
                    className={`flex items-center cursor-pointer justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-emerald-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${
                      wishlistIds?.includes(product.id)
                        ? "bg-red-50 text-red-500 hover:bg-red-100"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    role="button"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlistIds?.includes(product.id) ? "fill-current" : ""
                      }`}
                    />{" "}
                    Add to wishlist
                  </button>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    title
                    className="text-white cursor-pointer mt-4 sm:mt-0 bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800 flex items-center justify-center"
                    role="button"
                  >
                    {loading && currentId === product.id ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center mx-auto">
          <div className="sk-folding-cube ">
            <div className="sk-cube1 sk-cube" />
            <div className="sk-cube2 sk-cube" />
            <div className="sk-cube4 sk-cube" />
            <div className="sk-cube3 sk-cube" />
          </div>
        </div>
      )}

      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="lg:w-1/4 p-2 md:w-1/3 sm:w-1/2 ">
              <div className="group relative w-full max-w-sm rounded-2xl glass-effect product-card-shadow transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]  ">
                {/* Image Container */}
                <Link
                  to={`/productdetails/${product?.category?.name}/${product.id}`}
                >
                  <div className="absolute aspect-[4/3] w-full overflow-hidden rounded-t-2xl" />
                  <div
                    className={`relative inset-0 aspect-[4/3]  ${
                      imgIsLoading ? "animate-shimmer" : ""
                    }`}
                  >
                    <img
                      src={product?.imageCover}
                      className={`h-full w-full rounded-t-2xl object-cover transition-opacity duration-300 ${
                        imgIsLoading ? "opacity-0" : "opacity-100"
                      }`}
                      onLoad={() => setimgIsLoading(false)}
                      alt=""
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}

                    <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
                      {product?.category?.name}
                    </span>
                    {/* Product Info */}
                    <div className="mt-4 space-y-2">
                      <h3 className="text-lg font-medium text-gray-900 leading-tight">
                        {product?.title.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="flex justify-between ">
                        <span className="text-xl font-semibold text-gray-900">
                          EGP {product?.price.toLocaleString()}
                        </span>
                        <span>
                          <i className="fa fa-star text-yellow-400"></i>
                          {product?.ratingsAverage}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Actions */}
                <div className=" flex items-center gap-2 p-3">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex-1 cursor-pointer inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                  >
                    {loading && currentId === product.id ? (
                      <i className="fa fa-spinner fa-spin"></i>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to cart
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleAddToWishlist(product.id, product)}
                    className={`inline-flex items-center cursor-pointer justify-center rounded-xl p-2.5 transition-colors ${
                      wishlistIds?.includes(product.id)
                        ? "bg-red-50 text-red-500 hover:bg-red-100"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlistIds?.includes(product.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center mx-auto">
            <div className="sk-folding-cube ">
              <div className="sk-cube1 sk-cube" />
              <div className="sk-cube2 sk-cube" />
              <div className="sk-cube4 sk-cube" />
              <div className="sk-cube3 sk-cube" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
