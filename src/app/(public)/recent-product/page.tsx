"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { useUser } from "@/context/user.provider";

const Page = () => {
  const { recentProduct } = useUser();
  return (
    <div className="my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6">Recent Products</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProduct && recentProduct.length ? (
          recentProduct?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No Product found</p>
        )}
      </div>
    </div>
  );
};

export default Page;
