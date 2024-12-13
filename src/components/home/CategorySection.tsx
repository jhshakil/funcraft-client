import { TCategory } from "@/types/category.type";
import CategoryCard from "../category/CategoryCard";

type Props = {
  categories: TCategory[];
};

const CategorySection = ({ categories }: Props) => {
  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
