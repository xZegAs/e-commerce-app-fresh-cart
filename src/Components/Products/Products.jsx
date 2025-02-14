import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import useProduct from "../../Hooks/useProduct";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Products() {
  const [imgIsLoading, setimgIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  const { data, isError, isLoading, error } = useProduct();
  const {
    addProductToCart,
    addProductToWishlist,
    getLoggedUserWishlist,
    wishlist,
    setWishlist,
  } = useContext(CartContext);

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
    handleGetLoggedUserWishlist();
  }, [wishlist, wishlistIds]);

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

  if (isError) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <div className="sk-folding-cube ">
          <div className="sk-cube1 sk-cube" />
          <div className="sk-cube2 sk-cube" />
          <div className="sk-cube4 sk-cube" />
          <div className="sk-cube3 sk-cube" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {data?.data?.data?.map((product) => (
          <div key={product.id} className="lg:w-1/4 p-2 md:w-1/3 sm:w-1/2 ">
            <div className="group relative w-full max-w-sm rounded-2xl glass-effect product-card-shadow transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]  ">
              {/* Image Container */}
              <Link
                to={`productdetails/${product?.category?.name}/${product.id}`}
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
                  className="flex-1 inline-flex cursor-pointer items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
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
        ))}
      </div>
    </>
  );
}
