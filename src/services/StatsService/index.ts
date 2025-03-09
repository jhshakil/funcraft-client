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

export const getStatsByVendor = async ({ shopId }: { shopId: string }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["vendor_stats"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/stats/vendor/${shopId}`);

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};

export const getStatsByAdmin = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const fetchOption = {
    next: {
      tags: ["vendor_stats"],
    },
    headers: {
      Authorization: accessToken as string,
    },
  };

  const url = new URL(`${envConfig.baseUrl}/stats/admin`);

  const res = await fetch(url.toString(), fetchOption);

  return res.json();
};
