"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CreateReview() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ rating, comment });
    setRating(0);
    setComment("");
  };

  return (
    <div>
      <h2 className="text-3xl font-medium mb-4">Add A Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="rating">Rating</Label>
          <div className="flex items-center space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`focus:outline-none ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="comment">Your Review</Label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            className="mt-1"
            rows={4}
          />
        </div>
        <Button type="submit" disabled={rating === 0 || comment.trim() === ""}>
          Submit Review
        </Button>
      </form>
    </div>
  );
}
