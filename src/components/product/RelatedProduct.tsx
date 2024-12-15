"use client";

import { TProductData } from "@/types/product.types";
import { ProductCard } from "../product/ProductCard";

type Props = {
  products: TProductData[];
};

const RelatedProduct = ({ products }: Props) => {
  return (
    <div className="my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6">Related Products</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
