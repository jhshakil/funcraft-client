import AdminReviewList from "@/components/review/AdminReviewList";
import { getCurrentUser } from "@/services/AuthService";
import { getAllUserReview } from "@/services/ReviewService";
import { getUser } from "@/services/UserService";
import { TCustomerData } from "@/types/user.types";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const user = await getCurrentUser();
  let userData: { data: TCustomerData } | null = null;

  try {
    if (user?.id) {
      userData = await getUser(user?.id as string);
    }
  } catch (error) {
    console.log(error);
  }

  const reviews = await getAllUserReview({
    page: searchParams.page || "1",
    id: userData?.data?.id as string,
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
          role={user?.role}
        />
      </div>
    </div>
  );
};

export default Page;
