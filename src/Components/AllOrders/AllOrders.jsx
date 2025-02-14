import React, { useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    const token = jwtDecode(localStorage.getItem("userToken"));
    getAllOrders(token.id);
  }, []);

  async function getAllOrders(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      setUserOrders(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {userOrders === null ? (
        <div className="flex justify-center items-center mx-auto">
          <div className="sk-folding-cube ">
            <div className="sk-cube1 sk-cube" />
            <div className="sk-cube2 sk-cube" />
            <div className="sk-cube4 sk-cube" />
            <div className="sk-cube3 sk-cube" />
          </div>
        </div>
      ) : (
        <div className="container ">
          {userOrders?.map((order) => (
            <React.Fragment key={order?.id}>
              <div className="my-5 mx-5">
                <div className="text-2xl font-bold text-gray-600">
                  Payment Method: {order?.paymentMethodType}
                </div>
                <div className="my-7">
                  <div className="text-2xl font-bold text-gray-600">
                    shipping address:
                  </div>
                  <div className="text-xl font-bold text-gray-600">
                    City: {order?.shippingAddress.city}
                  </div>
                  <div className="text-xl font-bold text-gray-600">
                    Details: {order?.shippingAddress.details}
                  </div>
                  <div className="text-xl font-bold text-gray-600">
                    Phone: {order?.shippingAddress.phone}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-600">
                  Total Price: {order?.totalOrderPrice} EGP
                </div>
              </div>
              <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Product
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrders?.cartItems?.map((item) => {
                          <tr className="border-b">
                            <th
                              scope="row"
                              className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                            >
                              <img
                                src={item?.product?.imageCover}
                                className="w-10 h-10 rounded-full"
                                alt=""
                              />
                              <div className="ps-3">
                                <div className="text-base font-semibold">
                                  {item?.product?.title}
                                </div>
                                <div className="font-normal text-gray-500">
                                  {item?.product?.category?.name}
                                </div>
                              </div>
                            </th>
                            <td className="px-6 py-4">{item?.count}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {item?.price * item?.count} EGP
                              </div>
                            </td>
                          </tr>;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
}
