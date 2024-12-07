"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-background p-11 rounded-lg mt-5">
      <h2 className="text-[42px] text-center">Something went wrong!</h2>
      <p className="text-center text-2xl">
        Failed to connect server. We will fixed this problem soon
      </p>
      <div className="flex mt-5 justify-center">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
