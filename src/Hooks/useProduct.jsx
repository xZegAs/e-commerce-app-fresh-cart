import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProduct() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const productInfo = useQuery({
    queryKey: ["recentProducts"],
    queryFn: getProducts,
    staleTime: 60 * 1000,
    cacheTime: 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 60 * 1000,
    gcTime: 60 * 1000,
  });

  return productInfo;
}
