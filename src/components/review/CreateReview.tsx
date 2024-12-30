"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCreateReview } from "@/hooks/review.hook";

type Props = {
  isEnableReview: boolean;
  productId: string;
  customerId: string;
};

export function CreateReview({ isEnableReview, productId, customerId }: Props) {
  const [ratting, setRatting] = useState(0);
  const [review, setReview] = useState("");

  const { mutate: handleCreateReview } = useCreateReview();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      productId,
      customerId,
      ratting,
      review,
    };

    handleCreateReview(data);
    setRatting(0);
    setReview("");
  };

  return (
    <div>
      <h2 className="text-3xl font-medium mb-4">Add A Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="ratting">Ratting</Label>
          <div className="flex items-center space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRatting(star)}
                className={`focus:outline-none ${
                  star <= ratting ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="review">Your Review</Label>
          <Textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="mt-1"
            rows={4}
          />
        </div>
        <Button
          type="submit"
          disabled={!isEnableReview || ratting === 0 || review.trim() === ""}
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
}
