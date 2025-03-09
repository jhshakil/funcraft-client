"use server";

import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";

export const getStatsByCustomer = async ({
  customerId,
}: {
  customerId: string;
}) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["customer_stats"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/stats/customer/${customerId}`);

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};
