import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [wishlist, setWishlist] = useState(null);
  const [cartId, setCartId] = useState(null);

  const headers = { token: localStorage.getItem("userToken") };
  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setCartId(res.data.cartId);
        return res;
      })
      .catch((err) => err);
  }

  function updateProductCount(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteProductFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function addProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getLoggedUserWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteProductFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  // function checkout(cartId, url, formData) {
  //   return axios
  //     .post(
  //       `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
  //       {
  //         shippingAddress: formData,
  //       },
  //       { headers }
  //     )
  //     .then((res) => res)
  //     .catch((err) => err);
  // }

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        getLoggedUserCart,
        updateProductCount,
        deleteProductFromCart,
        addProductToWishlist,
        getLoggedUserWishlist,
        deleteProductFromWishlist,
        wishlist,
        setWishlist,
        // checkout,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
