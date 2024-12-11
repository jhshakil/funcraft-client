"use server";

import { envConfig } from "@/config/envConfig";

export const getAllProduct = async ({
  page,
  shopId,
}: {
  page?: string;
  shopId: string;
}) => {
  const fetchOption = {
    next: {
      tags: ["products"],
    },
  };

  const url = new URL(`${envConfig.baseUrl}/product/shop/${shopId}`);

  if (page) {
    url.searchParams.append("page", page);
  }

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};
