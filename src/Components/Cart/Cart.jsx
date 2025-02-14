import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { ArrowRight, Heart, MoveRight, X } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);

  const {
    getLoggedUserCart,
    updateProductCount,
    deleteProductFromCart,
    addProductToWishlist,
  } = useContext(CartContext);

  async function handleGetLoggedUserCart() {
    const res = await getLoggedUserCart();
    // console.log(res.data.data);
    if (res.data.status === "success") {
      setCartDetails(res.data.data);
    }
  }

  async function handleUpdateProductCount(productId, newCount) {
    const res = await updateProductCount(productId, newCount);
    // console.log(res);
    if (res.data.status === "success") {
      handleGetLoggedUserCart(res.data.data);
    } else {
      toast.error("Something went wrong");
    }
  }

  async function handleDeleteProductFromCart(productId) {
    const res = await deleteProductFromCart(productId);
    // console.log(res);
    if (res.data.status === "success") {
      handleGetLoggedUserCart(res.data.data);
    } else {
      toast.error("Something went wrong");
    }
  }

  async function handleAddProductToWishlist(productId) {
    const res = await addProductToWishlist(productId);
    // console.log(res);
    if (res.data.status === "success") {
      deleteProductFromCart(productId);
      handleGetLoggedUserCart(res.data.data);
    } else {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    handleGetLoggedUserCart();
  });

  return (
    <>
      {cartDetails ? (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Shopping Cart
            </h2>
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                {cartDetails?.products?.length > 0 ? (
                  <div className="space-y-6">
                    {cartDetails?.products?.map((product) => (
                      <div
                        key={product?.product?.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                      >
                        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                          <a href="#" className="shrink-0 md:order-1">
                            <img
                              className="h-20 w-20 rounded-lg object-cover md:h-28 md:w-28"
                              src={product?.product?.imageCover}
                              alt=""
                            />
                          </a>
                          <label htmlFor="counter-input" className="sr-only">
                            Choose quantity:
                          </label>
                          <div className="flex items-center justify-between md:order-3 md:justify-end">
                            <div className="flex items-center">
                              <button
                                type="button"
                                onClick={() => {
                                  handleUpdateProductCount(
                                    product.product.id,
                                    product.count - 1
                                  );
                                }}
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <span className="w-8 text-center ">
                                {product?.count}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  handleUpdateProductCount(
                                    product?.product?.id,
                                    product?.count + 1
                                  );
                                }}
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                              >
                                <svg
                                  className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="text-end md:order-4 md:w-32">
                              <p className="text-base font-bold text-gray-900 dark:text-white">
                                {product?.price * product?.count} EGP
                              </p>
                            </div>
                          </div>
                          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                            <Link
                              to={`/productdetails/${product.product.category.name}/${product.product.id}`}
                              className="text-base font-medium text-gray-900 hover:underline dark:text-white"
                            >
                              {product?.product?.title}
                            </Link>
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => {
                                  handleAddProductToWishlist(
                                    product?.product?.id
                                  );
                                }}
                                className="inline-flex items-center cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                              >
                                <Heart />
                                Add to Favorites
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteProductFromCart(
                                    product?.product?.id
                                  );
                                }}
                                type="button"
                                className="inline-flex items-center cursor-pointer text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              >
                                <X />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-3xl font-bold text-center text-gray-900 ">
                      Your cart is empty.
                    </p>
                    <Link
                      to="/products"
                      className="flex items-center justify-center gap-2 text-sm font-medium text-gray-900 hover:underline dark:text-white"
                    >
                      Continue Shopping
                      <ArrowRight />
                    </Link>
                  </div>
                )}
              </div>
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    Order summary
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                          Number of items
                        </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                          {cartDetails?.products?.length}
                        </dd>
                      </dl>
                    </div>
                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        {cartDetails?.totalCartPrice} EGP
                      </dd>
                    </dl>
                  </div>
                  <Link
                    to="/checkout"
                    className="flex w-full items-center justify-center rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                  >
                    Proceed to Checkout
                  </Link>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      or{" "}
                    </span>
                    <Link
                      to="/products"
                      title
                      className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 underline hover:no-underline dark:text-emerald-500"
                    >
                      Continue Shopping
                      <MoveRight size={18} />
                    </Link>
                  </div>
                </div>
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
    </>
  );
}
