import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TProductData } from "@/types/product.types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../shared/AddToCart";

type Props = {
  products: TProductData[];
};

const NewArrivals = ({ products }: Props) => {
  if (!products?.length) return null;

  const displayProducts = products.slice(0, 3);

  return (
    <section className="my-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={
                      (product.thumbnailImage as string) || "/placeholder.svg"
                    }
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <Badge className="absolute top-3 left-3 bg-primary text-white font-medium">
                  New
                </Badge>

                {product.ratting && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 text-white text-sm px-2 py-1 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{product.ratting.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description ||
                    "No description available for this product."}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </div>

                  <AddToCart
                    product={product}
                    iconOnly
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
