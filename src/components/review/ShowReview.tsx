"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, StarHalf } from "lucide-react";
import { TReview } from "@/types/review.type";
import { format } from "date-fns";

type Props = {
  reviews: TReview[];
};

const ShowReview = ({ reviews }: Props) => {
  console.log(reviews);
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
      <div>
        {reviews?.map((review) => (
          <Card key={review.id} className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={review?.customer?.profilePhoto}
                  alt={review?.customer?.name}
                />
                <AvatarFallback>
                  {review?.customer?.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle className="text-lg">
                  {review?.customer?.name}
                </CardTitle>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <span key={index}>
                      {index < review?.ratting ? (
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      ) : (
                        <Star className="w-5 h-5 text-gray-300" />
                      )}
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {review?.ratting}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{review?.review}</p>
              <p className="text-sm text-gray-500">
                Posted on {format(review?.createdAt as string, "d MMMM")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowReview;
