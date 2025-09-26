import { getAllCategory } from "@/services/CategoryService";
import CategorySection from "@/components/home/CategorySection";

const CategorySectionWrapper = async () => {
  const res = await getAllCategory({});
  return <CategorySection categories={res.data} />;
};

export default CategorySectionWrapper;
