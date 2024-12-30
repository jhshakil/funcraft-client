import CategoryList from "@/components/category/CategoryList";
import { CreateCategory } from "@/components/category/CreateCategory";
import { getAllCategory } from "@/services/CategoryService";

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const categories = await getAllCategory({ page: searchParams.page || "1" });
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Categories</h1>
        <div>
          <CreateCategory />
        </div>
      </div>
      <div className="mt-11">
        <CategoryList
          categories={categories.data}
          meta={categories.meta}
          currentPage={searchParams.page || "1"}
          path="/dashboard/admin/users"
        />
      </div>
    </div>
  );
};

export default Page;
