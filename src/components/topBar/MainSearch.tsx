"use client";

import { Input } from "@/components/ui/input";
import { useGetAllPost } from "@/hooks/post.hook";
import { TPost } from "@/types/post.types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";

type Props = {
  userEmail: string;
};

const MainSearch = ({ userEmail }: Props) => {
  const { mutate: getSearchPost, data: allPostData } = useGetAllPost();
  const [timeOutValue, setTimeOutValue] = useState<NodeJS.Timeout>();
  const [allSearchData, setALlSearchData] = useState([]);

  const stringToSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const sampleData = async (inputData: string) => {
    if (timeOutValue) {
      clearTimeout(timeOutValue);
    }
    const timeValue = setTimeout(async () => {
      if (inputData) {
        getSearchPost({ email: userEmail, searchTerm: inputData });
      } else {
        setALlSearchData([]);
      }
    }, 500);
    setTimeOutValue(timeValue);
  };

  useEffect(() => {
    if (allPostData?.data?.length) {
      setALlSearchData(allPostData.data);
    }
  }, [allPostData?.data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
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
              <ul>
                {allSearchData?.map((item: TPost, i: number) => (
                  <li
                    key={`search_item-${i}`}
                    onClick={() => setALlSearchData([])}
                  >
                    <Link
                      href={`/post/${stringToSlug(item.title)}?key=${item._id}`}
                    >
                      {item.title}
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
