"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useGetAllProduct } from "@/hooks/product.hook";
import { TProductData } from "@/types/product.types";

const MainSearch = () => {
  const { mutate: getSearchProduct, data: allProductData } = useGetAllProduct();
  const [timeOutValue, setTimeOutValue] = useState<NodeJS.Timeout>();
  const [allSearchData, setALlSearchData] = useState([]);
  const [proOpen, setProOpen] = useState(false);

  const sampleData = async (inputData: string) => {
    if (timeOutValue) {
      clearTimeout(timeOutValue);
    }
    const timeValue = setTimeout(async () => {
      if (inputData) {
        getSearchProduct({ searchTerm: inputData });
      } else {
        setALlSearchData([]);
      }
    }, 500);
    setTimeOutValue(timeValue);
  };

  useEffect(() => {
    if (allProductData?.data?.length) {
      setALlSearchData(allProductData.data);
    }
  }, [allProductData?.data]);

  return (
    <Dialog open={proOpen} onOpenChange={setProOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setProOpen(true)}>
          <Search size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="[&>.close-button]:hidden p-4">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="w-full relative">
          <Input
            type="text"
            placeholder="Search..."
            className="w-full "
            onChange={(e) => sampleData(e.target.value)}
          />
          {allSearchData && allSearchData?.length ? (
            <div className="absolute top-[50px] bg-background w-full p-4 z-20">
              <ul className=" divide-y-2">
                {allSearchData?.map((item: TProductData, i: number) => (
                  <li
                    key={`search_item-${i}`}
                    onClick={() => {
                      setALlSearchData([]);
                      setProOpen(false);
                    }}
                    className="py-4"
                  >
                    <Link href={`/product/${item?.id}?key=${item?.id}`}>
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MainSearch;
