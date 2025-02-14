import React from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, ShoppingBasket } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const location = useLocation();
  const { userLogin, setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    toast.success("Logout successfully");
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 right-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="FreshCart Logo" />
          </Link>
          <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            {userLogin !== null ? (
              <span
                onClick={handleLogout}
                className="text-emerald-700 cursor-pointer bg-white hover:bg-emerald-800 hover:text-white  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mx-1"
              >
                Logout
              </span>
            ) : (
              <>
                <Link
                  className="text-emerald-700 bg-white hover:bg-emerald-800 hover:text-white  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-900 dark:text-white dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mx-1"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="text-white bg-emerald-700 hover:bg-emerald-800  focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 mx-1"
                  to="/register"
                >
                  Get started
                </Link>
              </>
            )}

            {userLogin !== null ? (
              <>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </>
            ) : null}
          </div>

          <div
            className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
            id="navbar-sticky"
          >
            {userLogin !== null ? (
              <>
                <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link
                      to=""
                      className={`link ${
                        location.pathname === "/" && "active"
                      }`}
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      className={`link ${
                        location.pathname === "/products" && "active"
                      }`}
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      className={`link ${
                        location.pathname === "/categories" && "active"
                      }`}
                    >
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/brands"
                      className={`link ${
                        location.pathname === "/brands" && "active"
                      }`}
                    >
                      Brands
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/allorders"
                      className={`link ${
                        location.pathname === "/allorders" && "active"
                      }`}
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className={`link ${
                        location.pathname === "/cart" && "active"
                      }`}
                    >
                      <div className="flex gap-2">
                        <ShoppingBasket />
                        <span>Cart</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wishlist"
                      className={`link ${
                        location.pathname === "/wishlist" && "active"
                      }`}
                    >
                      <div className="flex gap-2">
                        <Heart />
                        <span>Wishlist</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
