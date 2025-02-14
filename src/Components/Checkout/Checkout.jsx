import React, { useContext, useState } from "react";
import style from "./Checkout.module.css";
import { useFormik } from "formik";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import PageTitleChange from "../PageTitleChange/PageTitleChange";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
export default function Checkout() {
  const { cartId } = useContext(CartContext);
  const navigate = useNavigate();
  const { userLogin } = useContext(UserContext);
  const [paymentMethod, setPaymentMethod] = useState(null);

  async function createCashOrder(values) {
    const toastId = toast.loading("Please wait...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token: userLogin,
        },
        data: values,
      };
      const { data } = await axios.request(options);

      if (data.status === "success") {
        toast.success("Order created successfully");
        setTimeout(() => {
          navigate("/allorders", 2000);
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function createOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token: userLogin,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.loading("redirecting you to stripe...");
        setTimeout(() => {
          location.href = data.session.url;
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (paymentMethod == "cash") createCashOrder(values);
      else createOnlineOrder(values);
    },
  });

  return (
    <>
      <PageTitleChange title="Checkout" />
      <section className=" dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img src={logo} className="h-8" alt="FreshCart Logo" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Checkout
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="details"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your details
                  </label>
                  <input
                    type="text"
                    name="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="details"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="e.g. John Doe"
                    required
                  />
                  {formik.touched.details && formik.errors.details ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Error!</span>{" "}
                        {formik.errors.details}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="phone"
                    placeholder="01234567891"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Error!</span>{" "}
                        {formik.errors.phone}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    id="city"
                    placeholder="e.g. Cairo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-emerald-600 focus:border-emerald-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium">Error!</span>{" "}
                        {formik.errors.city}
                      </div>
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  onClick={() => setPaymentMethod("cash")}
                  className="w-full cursor-pointer text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                >
                  Cash Order
                </button>
                <button
                  type="submit"
                  onClick={() => setPaymentMethod("online")}
                  className="w-full cursor-pointer text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                >
                  Online Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
