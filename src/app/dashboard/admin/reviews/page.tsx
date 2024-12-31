import AdminReviewList from "@/components/review/AdminReviewList";
import { getAllReview } from "@/services/ReviewService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const reviews = await getAllReview({
    page: searchParams.page || "1",
  });

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Reviews</h1>
      </div>
      <div className="mt-11">
        <AdminReviewList
          reviews={reviews.data}
          meta={reviews.meta}
          currentPage={searchParams.page || "1"}
          path="/dashboard/admin/reviews"
        />
      </div>
    </div>
  );
};

export default Page;
