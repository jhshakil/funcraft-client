"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";
import { TProductData } from "@/types/product.types";
import AddToCart from "../shared/AddToCart";
import Link from "next/link";
import { useUser } from "@/context/user.provider";
import { useEffect } from "react";

type Props = {
  product: TProductData;
};

const ProductDetailsOld = ({ product }: Props) => {
  const { recentProduct, updateRecentProduct } = useUser();

  useEffect(() => {
    const filterRecent = recentProduct
      ?.slice(0, 10)
      ?.filter((el) => el.id !== product.id);

    updateRecentProduct([product, ...filterRecent]);
  }, [product]);

  return (
    <div className="grid md:grid-cols-2 gap-8 my-11">
      <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
        <Image
          src={product?.thumbnailImage as string}
          alt={product?.name}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 ease-in-out"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
        <div>
          Category: <Badge className="mb-4">{product?.category?.name}</Badge>
        </div>
        <div>
          Shop:{" "}
          <Badge className="mb-4">
            <Link href={`/shop/${product?.shop?.id}`}>
              {product?.shop?.name}
            </Link>
          </Badge>
        </div>
        <p className="text-2xl font-semibold mb-4">
          Price: ${product?.price.toFixed(2)}
        </p>
        <div className="mb-4">
          <AddToCart product={product} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Product Description</h2>
          <p>{product?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsOld;
